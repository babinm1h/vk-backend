import { Types } from "mongoose"

export class CreateCommentDto {
    readonly text: string
    readonly post: Types.ObjectId
}