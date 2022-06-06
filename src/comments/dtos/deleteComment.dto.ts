import { Types } from "mongoose";

export class DeleteCommentDto {
    postId: Types.ObjectId
    commentId: Types.ObjectId
}