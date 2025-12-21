"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = createRoom;
const room_1 = __importDefault(require("../models/room"));
async function createRoom(req, res) {
    const { creatorId } = req.body;
    try {
        const room = await room_1.default.create({
            creatorId,
        });
        return res.status(201).json({
            status: "sucess",
            message: "Room created successfully",
            room: { _id: room._id, creatorId },
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: "error", message: "Internal Server Error" });
    }
}
//# sourceMappingURL=room.js.map