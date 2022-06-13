import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Comment, CommentDocument } from "src/comments/comment.schema";
import { User, UserDocument } from "src/user/user.schema";
import { CreatePostDto } from "./dtos/createPost.dto";
import { Post, PostDocument, PostSchema } from "./post.schema";



@Injectable()
export class PostService {

    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private cloudinaryService: CloudinaryService
    ) { }

    async getAll(page: number, limit = 3) {
        const posts = await this.postModel.find().sort({ createdAt: `desc` }).populate("user")
            .skip((page * limit) - limit).limit(limit)

        const totalCount = await this.postModel.find().count()

        let hasMore;
        if (posts.length * page < totalCount) {
            hasMore = true
        } else {
            hasMore = false
        }

        return { posts, totalCount, hasMore, page }
    }


    async getById(postId: Types.ObjectId) {
        let post = await this.postModel.findById(postId).populate("user")
        return post
    }


    async create(userId: Types.ObjectId, { text, file }: CreatePostDto) {
        let post;

        if (file) {
            const image = await this.cloudinaryService.uploadImage(file)
            post = await this.postModel.create({ user: userId, text, image })
        } else {
            post = await this.postModel.create({ user: userId, text })
        }

        await post.populate("user", "name avatar ")
        await this.userModel.findByIdAndUpdate(userId, { $push: { posts: post._id } })
        return post
    }


    async delete(id: Types.ObjectId, userId: Types.ObjectId) {
        const post = await this.postModel.findByIdAndDelete(id)
        await this.commentModel.deleteMany({ post: id })
        await this.userModel.findByIdAndUpdate(userId, { $pull: { posts: post._id } })
        return post
    }


    async like(userId: Types.ObjectId, postId: Types.ObjectId) {
        const post = await this.postModel.findById(postId)
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => String(id) !== String(userId))
            post.likesCount -= 1
        } else {
            post.likes.push(userId)
            post.likesCount += 1
        }

        await post.save()
        return post._id
    }


    async searchPosts(searchQuery: string) {
        const result = await this.postModel.find({ text: new RegExp(searchQuery, 'i') })
            .sort({ createdAt: 'desc' }).populate('user', "avatar name")

        return result
    }


    async getByUser(userId: Types.ObjectId) {
        const objectId = new Types.ObjectId(userId)
        const posts = await this.postModel.find({ user: objectId }).populate("user", 'name avatar')
            .sort({ createdAt: 'desc' })

        return posts
    }

}