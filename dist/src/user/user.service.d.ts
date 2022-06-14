import { Model, Types } from "mongoose";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { CommentDocument } from "src/comments/comment.schema";
import { EditUserDto } from "./dto/editUser.dto";
import { User, UserDocument } from "./user.schema";
export declare class UserService {
    private userModel;
    private CommentModel;
    private cloudinaryService;
    constructor(userModel: Model<UserDocument>, CommentModel: Model<CommentDocument>, cloudinaryService: CloudinaryService);
    getById(id: Types.ObjectId): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getProfile(id: Types.ObjectId): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    editUser(id: Types.ObjectId, dto: EditUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    toggleFollow(authUserId: Types.ObjectId, followUserId: Types.ObjectId): Promise<boolean>;
    searchUser(searchQuery: string): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    changeStatus(userId: Types.ObjectId, status: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getFollowers(userId: Types.ObjectId): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    searchFollowers(searchQuery: string, userId: Types.ObjectId): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
