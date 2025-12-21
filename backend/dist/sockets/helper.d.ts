import { Server } from "socket.io";
import { IRoom } from "../types";
export declare function findWinner(room: IRoom): string;
export declare function checkMatchEnd(io: Server, roomId: string): Promise<void>;
//# sourceMappingURL=helper.d.ts.map