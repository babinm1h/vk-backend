import { Types } from "mongoose"

export class CreateMessageDto {
    readonly text: string
    readonly userTo: Types.ObjectId
}