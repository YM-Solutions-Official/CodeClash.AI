"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectToDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDB(MONGO_URI) {
    mongoose_1.default.connection.on("connecting", () => {
        console.log("Mongoose connecting...");
    });
    mongoose_1.default.connection.on("connected", () => {
        console.log("Mongoose connected");
    });
    mongoose_1.default.connection.on("error", (err) => {
        console.log("Mongoose connection error:", err);
    });
    mongoose_1.default.connection.on("disconnected", () => {
        console.log("Mongoose disconnected");
    });
    await mongoose_1.default.connect(MONGO_URI);
}
//# sourceMappingURL=db.js.map