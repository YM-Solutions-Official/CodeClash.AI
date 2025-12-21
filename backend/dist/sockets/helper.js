"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findWinner = findWinner;
exports.checkMatchEnd = checkMatchEnd;
const room_1 = __importDefault(require("../models/room"));
const constants_1 = require("../lib/constants");
function findWinner(room) {
    const isCreatorSubmitted = room.submissions?.creator?.submitted;
    const isJoinerSubmitted = room.submissions?.joiner?.submitted;
    const creatorTime = room.submissions?.creator?.submissionTime;
    const joinerTime = room.submissions?.joiner?.submissionTime;
    if (isCreatorSubmitted && !isJoinerSubmitted) {
        return room.creatorId;
    }
    if (isJoinerSubmitted && !isCreatorSubmitted) {
        return room.joinedUser;
    }
    if (isCreatorSubmitted && isJoinerSubmitted) {
        return creatorTime < joinerTime ? room.creatorId : room.joinedUser;
    }
    return 'draw';
}
async function checkMatchEnd(io, roomId) {
    const room = await room_1.default.findById(roomId);
    if (!room || room.status !== constants_1.ROOM_STATUS.ACTIVE)
        return;
    const isCreatorSubmitted = room.submissions?.creator?.submitted;
    const isJoinerSubmitted = room.submissions?.joiner?.submitted;
    const timeUp = room.startTime && Date.now() >= room.startTime + (room.duration * 1000);
    if ((isCreatorSubmitted && isJoinerSubmitted) || timeUp) {
        room.status = constants_1.ROOM_STATUS.FINISHED;
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
//# sourceMappingURL=helper.js.map