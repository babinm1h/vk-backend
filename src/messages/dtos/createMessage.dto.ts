import { Types } from "mongoose"

export class CreateMessageDto {
    readonly text: string
    readonly senderId: Types.ObjectId
    readonly dialogId: Types.ObjectId
}