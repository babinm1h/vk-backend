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
import { Types } from "mongoose";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dtos/createComment.dto";
export declare class CommentsController {
    private commentsService;
    constructor(commentsService: CommentsService);
    create(dto: CreateCommentDto, req: any): Promise<import("mongoose").Document<any, any, any> & import("./comment.schema").Comment & {
        _id: any;
    }>;
    delete(commentId: Types.ObjectId, postId: any, req: any): Promise<Types.ObjectId>;
    getByPost(postId: Types.ObjectId): Promise<{
        count: number;
        firstComments: Omit<import("mongoose").Document<any, any, any> & import("./comment.schema").Comment & {
            _id: any;
        }, never>[];
    }>;
    getAllByPost(postId: Types.ObjectId): Promise<{
        count: number;
        comments: Omit<import("mongoose").Document<any, any, any> & import("./comment.schema").Comment & {
            _id: any;
        }, never>[];
    }>;
}
