import { Server } from "socket.io";
import RoomModel from "../models/room";
import { ROOM_STATUS } from "../lib/constants";
import { IRoom } from "../types";
import axios from "axios";

const PROXY_URL = process.env.PISTON_URL;

export function findWinner(room: IRoom): string {
  const isCreatorSubmitted = room.submissions?.creator?.submitted;
  const isJoinerSubmitted = room.submissions?.joiner?.submitted;
  const creatorTime = room.submissions?.creator?.submissionTime;
  const joinerTime = room.submissions?.joiner?.submissionTime;

  if (isCreatorSubmitted && !isJoinerSubmitted) {
    return room.creatorId;
  }
  if (isJoinerSubmitted && !isCreatorSubmitted) {
    return room.joinedUser!;
  }

  if (isCreatorSubmitted && isJoinerSubmitted) {
    return creatorTime! < joinerTime! ? room.creatorId : room.joinedUser!;
  }

  return "draw";
}

export async function checkMatchEnd(io: Server, roomId: string) {
  const room = await RoomModel.findById(roomId);
  if (!room || room.status !== ROOM_STATUS.ACTIVE) return;

  const isCreatorSubmitted = room.submissions?.creator?.submitted;
  const isJoinerSubmitted = room.submissions?.joiner?.submitted;
  const timeUp =
    room.startTime && Date.now() >= room.startTime + room.duration * 1000;

  if ((isCreatorSubmitted && isJoinerSubmitted) || timeUp) {
    room.status = ROOM_STATUS.FINISHED;
    room.endTime = Date.now();
    room.winner = findWinner(room);
    await room.save();

    io.to(roomId).emit("match_ended", {
      winner: room.winner,
      submissions: {
        creator: {
          submitted: isCreatorSubmitted,
          submissionTime: room.submissions?.creator?.submissionTime,
        },
        joiner: {
          submitted: isJoinerSubmitted,
          submissionTime: room.submissions?.joiner?.submissionTime,
        },
      },
      endTime: room.endTime,
    });

    console.log(`Match ended in room ${roomId}, winner: ${room.winner}`);
  }
}

export function parseInput(inputStr: string): any {
  try {
    const numsMatch = inputStr.match(/nums\s*=\s*(\[.*?\])/);
    const targetMatch = inputStr.match(/target\s*=\s*(\d+)/);

    if (numsMatch && targetMatch) {
      return {
        nums: JSON.parse(numsMatch[1]),
        target: parseInt(targetMatch[1]),
      };
    }

    return JSON.parse(inputStr);
  } catch (error) {
    throw new Error(`Failed to parse input: ${inputStr}`);
  }
}

export function parseOutput(outputStr: string): any {
  try {
    return JSON.parse(outputStr);
  } catch (error) {
    throw new Error(`Failed to parse output: ${outputStr}`);
  }
}

export async function executeCode(
  code: string,
  testCases: any[],
  language: string
) {
  const wrappedCode = `
${code}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function parseInput(inputStr) {
  const numsMatch = inputStr.match(/nums\\s*=\\s*(\\[.*?\\])/);
  const targetMatch = inputStr.match(/target\\s*=\\s*(\\d+)/);

  if (numsMatch && targetMatch) {
    return {
      nums: JSON.parse(numsMatch[1]),
      target: parseInt(targetMatch[1]),
    };
  }

  return JSON.parse(inputStr);
}

function parseOutput(outputStr) {
  return JSON.parse(outputStr);
}

const testCases = ${JSON.stringify(testCases)};
const results = [];

for (let i = 0; i < testCases.length; i++) {
  try {
    const input = parseInput(testCases[i].input);
    const expected = parseOutput(testCases[i].output);

    const start = Date.now();
    const output = twoSum(input.nums, input.target);
    const time = Date.now() - start;

    results.push({
      testCase: i + 1,
      passed: deepEqual(output, expected),
      output,
      expected,
      executionTime: time,
    });
  } catch (err) {
    results.push({
      testCase: i + 1,
      passed: false,
      error: err.message,
    });
  }
}

console.log(JSON.stringify(results));
`;

  try {
    console.log("Sending code to proxy...");

    const response = await axios.post(
      PROXY_URL!,
      {
        language: language,
        version: "18.15.0",
        files: [{ content: wrappedCode }],
      },
      {
        timeout: 20000,
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Received response from proxy");

    if (response.data.run?.stderr) {
      throw new Error(response.data.run.stderr);
    }

    if (!response.data.run?.stdout) {
      throw new Error("No output from code execution");
    }

    return JSON.parse(response.data.run.stdout);
  } catch (error: any) {
    console.error("Execution error:", error.message);

    if (error.code === "ECONNABORTED") {
      throw new Error("Timeout - code took too long to execute");
    }

    throw new Error(`Execution failed: ${error.message}`);
  }
}
