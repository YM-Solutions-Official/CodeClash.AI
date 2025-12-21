"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../lib/constants");
const RoomSchema = new mongoose_1.Schema({
    roomId: {
        type: String,
    },
    creatorId: {
        type: String,
        required: true,
    },
    joinedUser: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(constants_1.ROOM_STATUS),
        default: constants_1.ROOM_STATUS.WAITING,
    },
    problem: {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        inputFormat: {
            type: String,
        },
        outputFormat: {
            type: String,
        },
        constraints: [
            {
                type: String,
            },
        ],
        examples: [
            {
                input: String,
                output: String,
                explanation: String,
            },
        ],
    },
    duration: {
        type: Number,
        default: 900,
    },
    startTime: {
        type: Number,
    },
    submissions: {
        type: {
            creator: {
                submitted: { type: Boolean, default: false },
                submissionTime: Number,
                code: String,
            },
            joiner: {
                submitted: { type: Boolean, default: false },
                submissionTime: Number,
                code: String,
            },
        },
        default: () => ({
            creator: { submitted: false },
            joiner: { submitted: false },
        }),
    },
    winner: {
        type: String,
    },
    endTime: {
        type: Number,
    },
}, { timestamps: true });
const RoomModel = (0, mongoose_1.model)(constants_1.ROOM_MODEL, RoomSchema);
exports.default = RoomModel;
//# sourceMappingURL=room.js.map