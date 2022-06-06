import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Comment, CommentDocument } from "src/comments/comment.schema";
import { User, UserDocument } from "src/user/user.schema";
import { Post, PostDocument, PostSchema } from "./post.schema";



@Injectable()
export class PostService {

    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async getAll() {
        let posts = await this.postModel.find().sort({ createdAt: `desc` }).populate("user comments") as any
        posts = await this.commentModel.populate(posts, { path: "comments.user" })
        return posts
    }

    async create(userId: Types.ObjectId, text: string) {
        const post = await this.postModel.create({ user: userId, text })
        await post.populate("user comments")
        await this.userModel.findByIdAndUpdate(userId, { $push: { posts: post._id } })
        return post
    }

    async delete(id: Types.ObjectId, userId: Types.ObjectId) {
        const post = await this.postModel.findByIdAndDelete(id)
        await this.userModel.findByIdAndUpdate(userId, { $pull: { posts: post._id } })
        return post
    }


    async like(userId: Types.ObjectId, postId: Types.ObjectId) {
        const post = await this.postModel.findById(postId)
        if (post.likes.includes(userId)) return 'already liked'

        post.likes.push(userId)
        post.likesCount += 1
        await post.save()

        return post._id
    }


    async unlike(userId: Types.ObjectId, postId: Types.ObjectId) {
        const post = await this.postModel.findById(postId) as any
        if (!post.likes.includes(userId)) return 'not liked'

        await post.updateOne({
            $pull: { likes: userId },
            $inc: { likesCount: -1 }
        }, { new: true })

        await post.save()

        return post._id
    }
}