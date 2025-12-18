import { Server } from "socket.io";
import RoomModel from "../models/room";
import { ROOM_STATUS } from "../lib/constants";
import { IRoom } from "../types";

export function findWinner(room: IRoom):string {
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

  return 'draw';
}

export async function checkMatchEnd(io: Server, roomId: string) {
  const room = await RoomModel.findById(roomId);
  if (!room || room.status !== ROOM_STATUS.ACTIVE) return;

  const isCreatorSubmitted = room.submissions?.creator?.submitted;
  const isJoinerSubmitted = room.submissions?.joiner?.submitted;
  const timeUp = room.startTime && Date.now() >= room.startTime + (room.duration * 1000);


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