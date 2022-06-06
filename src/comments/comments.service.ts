import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Post, PostDocument } from "src/posts/post.schema";
import { Comment, CommentDocument } from "./comment.schema";
import { CreateCommentDto } from "./dtos/createComment.dto";
import { DeleteCommentDto } from "./dtos/deleteComment.dto";


@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(Post.name) private postModel: Model<PostDocument>
    ) { }


    async create({ post, text }: CreateCommentDto, user: Types.ObjectId) {
        const comm = await this.commentModel.create({ post, user, text })
        await this.postModel.findByIdAndUpdate(post, {
            $push: { comments: comm._id },
            $inc: { commentsCount: 1 }
        })
        return comm
    }


    async delete({ postId, commentId }: DeleteCommentDto, user: Types.ObjectId) {
        await this.commentModel.findByIdAndDelete(commentId)
        await this.postModel.findByIdAndUpdate(postId, {
            $pull: { comments: commentId },
            $inc: { commentsCount: -1 }
        })

        return commentId
    }
}
