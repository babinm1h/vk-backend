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
        return await this.commentModel.create({ post, user, text })
    }


    async delete({ postId, commentId }: DeleteCommentDto, user: Types.ObjectId) {
        await this.commentModel.findByIdAndDelete(commentId)
        return commentId
    }


    async getFirstByPost(postId: Types.ObjectId) {
        const firstComments = await this.commentModel.find({ post: postId })
            .populate("user", 'name avatar').limit(2)

        const commsCount = await this.commentModel.find({ post: postId }).count()

        return { count: commsCount, firstComments }
    }


    async getAllByPost(postId: Types.ObjectId) {
        const comments = await this.commentModel.find({ post: postId }).populate("user", 'name avatar')

        return { count: comments.length, comments }
    }
}
