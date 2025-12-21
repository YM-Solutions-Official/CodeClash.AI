import { Schema, Types } from "mongoose";
import type { IRoom } from "../types";
import { ROOM_STATUS } from "../lib/constants";
declare const RoomModel: import("mongoose").Model<IRoom, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, IRoom, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<IRoom, import("mongoose").Model<IRoom, any, any, any, import("mongoose").Document<unknown, any, IRoom, any, import("mongoose").DefaultSchemaOptions> & IRoom & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any, IRoom>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IRoom, import("mongoose").Document<unknown, {}, IRoom, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    roomId?: import("mongoose").SchemaDefinitionProperty<string | undefined, IRoom, import("mongoose").Document<unknown, {}, IRoom, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    creatorId?: import("mongoose").SchemaDefinitionProperty<string, IRoom, import("mongoose").Document<unknown, {}, IRoom, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    joinedUser?: import("mongoose").SchemaDefinitionProperty<string | undefined, IRoom, import("mongoose").Document<unknown, {}, IRoom, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    status?: import("mongoose").SchemaDefinitionProperty<ROOM_STATUS | undefined, IRoom, import("mongoose").Document<unknown, {}, IRoom, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    problem?: import("mongoose").SchemaDefinitionProperty<import("../types").IProblem | undefined, IRoom, import("mongoose").Document<unknown, {}, IRoom, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    duration?: import("mongoose").SchemaDefinitionProperty<number, IRoom, import("mongoose").Document<unknown, {}, IRoom, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    startTime?: import("mongoose").SchemaDefinitionProperty<number | undefined, IRoom, import("mongoose").Document<unknown, {}, IRoom, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    submissions?: import("mongoose").SchemaDefinitionProperty<import("../types").ISubmissions, IRoom, import("mongoose").Document<unknown, {}, IRoom, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    winner?: import("mongoose").SchemaDefinitionProperty<string | undefined, IRoom, import("mongoose").Document<unknown, {}, IRoom, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    endTime?: import("mongoose").SchemaDefinitionProperty<number | undefined, IRoom, import("mongoose").Document<unknown, {}, IRoom, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<IRoom & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IRoom>, IRoom>;
export default RoomModel;
//# sourceMappingURL=room.d.ts.map