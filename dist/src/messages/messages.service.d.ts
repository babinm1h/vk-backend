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
import { Model, Types } from "mongoose";
import { DialogDocument } from "src/dialogs/dialog.schema";
import { CreateMessageDto } from "./dtos/createMessage.dto";
import { Message, MessageDocument } from "./messages.schema";
export declare class MessagesService {
    private messageModel;
    private dialogModel;
    constructor(messageModel: Model<MessageDocument>, dialogModel: Model<DialogDocument>);
    create({ text, senderId, dialogId }: CreateMessageDto): Promise<import("mongoose").Document<any, any, any> & Message & {
        _id: any;
    }>;
    delete(messageId: Types.ObjectId, dialogId: Types.ObjectId): Promise<import("mongoose").Document<any, any, any> & Message & {
        _id: any;
    }>;
    getByUserTo(userFrom: Types.ObjectId, userTo: Types.ObjectId): Promise<Omit<Omit<import("mongoose").Document<any, any, any> & Message & {
        _id: any;
    }, never>, never>[]>;
}
