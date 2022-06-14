import { Model, Types } from "mongoose";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { CommentDocument } from "src/comments/comment.schema";
import { UserDocument } from "src/user/user.schema";
import { CreatePostDto } from "./dtos/createPost.dto";
import { Post, PostDocument } from "./post.schema";
export declare class PostService {
    private postModel;
    private commentModel;
    private userModel;
    private cloudinaryService;
    constructor(postModel: Model<PostDocument>, commentModel: Model<CommentDocument>, userModel: Model<UserDocument>, cloudinaryService: CloudinaryService);
    getAll(page: number, limit?: number): Promise<{
        posts: Omit<Post & import("mongoose").Document<any, any, any> & {
            _id: any;
        }, never>[];
        totalCount: number;
        hasMore: any;
        page: number;
    }>;
    getById(postId: Types.ObjectId): Promise<Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    create(userId: Types.ObjectId, { text, file }: CreatePostDto): Promise<any>;
    delete(id: Types.ObjectId, userId: Types.ObjectId): Promise<Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    like(userId: Types.ObjectId, postId: Types.ObjectId): Promise<any>;
    searchPosts(searchQuery: string): Promise<Omit<Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    getByUser(userId: Types.ObjectId): Promise<Omit<Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
}
