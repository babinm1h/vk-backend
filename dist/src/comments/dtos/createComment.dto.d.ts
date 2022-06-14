import { Types } from "mongoose";
export declare class CreateCommentDto {
    readonly text: string;
    readonly post: Types.ObjectId;
}
