/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indizes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
import { Model, Types } from "mongoose";
import { PostDocument } from "src/posts/post.schema";
import { Comment, CommentDocument } from "./comment.schema";
import { CreateCommentDto } from "./dtos/createComment.dto";
import { DeleteCommentDto } from "./dtos/deleteComment.dto";
export declare class CommentsService {
    private commentModel;
    private postModel;
    constructor(commentModel: Model<CommentDocument>, postModel: Model<PostDocument>);
    create({ post, text }: CreateCommentDto, user: Types.ObjectId): Promise<import("mongoose").Document<any, any, any> & Comment & {
        _id: any;
    }>;
    delete({ postId, commentId }: DeleteCommentDto, user: Types.ObjectId): Promise<Types.ObjectId>;
    getFirstByPost(postId: Types.ObjectId): Promise<{
        count: number;
        firstComments: Omit<import("mongoose").Document<any, any, any> & Comment & {
            _id: any;
        }, never>[];
    }>;
    getAllByPost(postId: Types.ObjectId): Promise<{
        count: number;
        comments: Omit<import("mongoose").Document<any, any, any> & Comment & {
            _id: any;
        }, never>[];
    }>;
}
