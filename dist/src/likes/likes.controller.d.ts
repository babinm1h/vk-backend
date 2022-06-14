import { Types } from "mongoose";
import { LikesService } from "./likes.service";
export declare class LikesController {
    private likesService;
    constructor(likesService: LikesService);
    isExist(postId: Types.ObjectId, req: any): Promise<boolean>;
    getAllCount(postId: Types.ObjectId): Promise<number>;
    toggleLike(postId: Types.ObjectId, req: any): Promise<import("./like.schema").Like & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
