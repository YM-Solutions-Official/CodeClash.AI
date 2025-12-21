"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_1 = require("../service");
const roomRouter = (0, express_1.Router)();
roomRouter.post("/", service_1.createRoom);
exports.default = roomRouter;
//# sourceMappingURL=room.js.map