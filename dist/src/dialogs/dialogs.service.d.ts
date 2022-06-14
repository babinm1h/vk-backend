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
import { MessageDocument } from "src/messages/messages.schema";
import { Dialog, DialogDocument } from "./dialog.schema";
export declare class DialogsService {
    private dialogModel;
    private messageModel;
    constructor(dialogModel: Model<DialogDocument>, messageModel: Model<MessageDocument>);
    getById(dialogId: Types.ObjectId): Promise<import("mongoose").Document<any, any, any> & Dialog & {
        _id: any;
    }>;
    create(userFrom: Types.ObjectId, userTo: Types.ObjectId): Promise<import("mongoose").Document<any, any, any> & Dialog & {
        _id: any;
    }>;
    getAll(userId: Types.ObjectId): Promise<Omit<Omit<import("mongoose").Document<any, any, any> & Dialog & {
        _id: any;
    }, never>, never>[]>;
    getOne(dialogId: Types.ObjectId): Promise<any>;
}
