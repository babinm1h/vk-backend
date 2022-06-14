/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indizes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
import { Types } from "mongoose";
import { MessagesService } from "./messages.service";
export declare class MessagesController {
    private messagesService;
    constructor(messagesService: MessagesService);
    create(text: string, dialogId: Types.ObjectId, req: any): Promise<import("mongoose").Document<any, any, any> & import("./messages.schema").Message & {
        _id: any;
    }>;
    delete(id: Types.ObjectId): void;
    getByUserTo(id: Types.ObjectId, req: any): Promise<Omit<Omit<import("mongoose").Document<any, any, any> & import("./messages.schema").Message & {
        _id: any;
    }, never>, never>[]>;
}
