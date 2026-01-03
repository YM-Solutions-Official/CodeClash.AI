import { Server } from "socket.io";
import RoomModel from "../models/room";
import { ROOM_STATUS } from "../lib/constants";
import { IRoom } from "../types";

export function findWinner(room: IRoom): string {
  const isCreatorSubmitted = room.submissions?.creator?.submitted;
  const isJoinerSubmitted = room.submissions?.joiner?.submitted;
  const creatorTime = room.submissions?.creator?.submissionTime;
  const joinerTime = room.submissions?.joiner?.submissionTime;

  if (isCreatorSubmitted && !isJoinerSubmitted) {
    return room.creatorId;
  }
  if (isJoinerSubmitted && !isCreatorSubmitted) {
    return room.joinerId;
  }

  if (isCreatorSubmitted && isJoinerSubmitted) {
    return creatorTime! < joinerTime! ? room.creatorId : room.joinerId;
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
        target: parseInt(targetMatch[1])
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
  const results: any[] = [];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];

    try {
      // Parse input and expected output
      const input = parseInput(testCase.input);
      const expectedOutput = parseOutput(testCase.output);

      // Create a safe execution context
      const startTime = Date.now();
      const result = await runInSandbox(code, input, language);
      const executionTime = Date.now() - startTime;

      // Compare results
      const passed = JSON.stringify(result) === JSON.stringify(expectedOutput);

      results.push({
        testCase: i + 1,
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: JSON.stringify(result),
        passed,
        executionTime,
        error: null,
      });
    } catch (error: any) {
      results.push({
        testCase: i + 1,
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: null,
        passed: false,
        executionTime: 0,
        error: error.message,
      });
    }
  }

  return results;
}

async function runInSandbox(code: string, input: any, language: string) {
  if (language !== "javascript") {
    throw new Error("Only JavaScript is supported");
  }

  // Create a safe execution environment
  const { VM } = require("vm2");
  const vm = new VM({
    timeout: 5000, // 5 second timeout
    sandbox: {},
  });

  // Wrap the code to call with input
  const wrappedCode = `
    ${code}
    
    // Call the function with test input
    const result = twoSum(${JSON.stringify(input.nums)}, ${input.target});
    result;
  `;

  return vm.run(wrappedCode);
}
