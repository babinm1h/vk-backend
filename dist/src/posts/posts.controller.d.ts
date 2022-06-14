import { Types } from "mongoose";
import { PostService } from "./posts.service";
export declare class PostsController {
    private postsService;
    constructor(postsService: PostService);
    getAll(page: number): Promise<{
        posts: Omit<import("./post.schema").Post & import("mongoose").Document<any, any, any> & {
            _id: any;
        }, never>[];
        totalCount: number;
        hasMore: any;
        page: number;
    }>;
    getById(postId: Types.ObjectId): Promise<import("./post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    create(req: any, text: any, file: any): Promise<any>;
    delete(id: Types.ObjectId, req: any): Promise<import("./post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    edit(id: Types.ObjectId): void;
    like(req: any, postId: Types.ObjectId): Promise<any>;
    searchPosts(searchQuery: string): Promise<Omit<import("./post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
    getByUser(userId: Types.ObjectId): Promise<Omit<import("./post.schema").Post & import("mongoose").Document<any, any, any> & {
        _id: any;
    }, never>[]>;
}
