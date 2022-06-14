import { Types } from "mongoose";
export declare class CreateMessageDto {
    readonly text: string;
    readonly senderId: Types.ObjectId;
    readonly dialogId: Types.ObjectId;
}
