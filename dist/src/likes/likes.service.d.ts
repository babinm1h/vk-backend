import { Model, Types } from "mongoose";
import { Like, LikeDocument } from "./like.schema";
export declare class LikesService {
    private likeModel;
    constructor(likeModel: Model<LikeDocument>);
    isExist(postId: Types.ObjectId, userId: Types.ObjectId): Promise<boolean>;
    getAllCount(postId: Types.ObjectId): Promise<number>;
    toggle(postId: Types.ObjectId, userId: Types.ObjectId): Promise<Like & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
