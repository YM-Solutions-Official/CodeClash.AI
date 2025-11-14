import type { UserType } from "../types/user";

declare global {
    namespace Express {
        interface User extends UserType { }

        interface Request {
            user?: UserType;
            otpDetails?: any & Document;
            details?: any & Document;
            files?: any;
            updatedBody: any;
        }
    }
}
