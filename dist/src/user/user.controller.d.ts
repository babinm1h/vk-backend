import { Types } from "mongoose";
import { EditUserDto } from "./dto/editUser.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getById(id: string): Promise<import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getProfile(id: Types.ObjectId): Promise<import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    editUser(dto: EditUserDto, req: any, avatar: any): Promise<import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    searchUser(searchQuery: string): Promise<(import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    toggleFollow(followUserId: Types.ObjectId, req: any): Promise<boolean>;
    changeStatus(req: any, status: string): Promise<import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getUserFollowers(req: any): Promise<(import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    searchFollowers(req: any, searchQuery: string): Promise<(import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
