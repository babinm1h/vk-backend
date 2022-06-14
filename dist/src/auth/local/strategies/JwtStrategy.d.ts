import { Types } from "mongoose";
import { Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(payload: {
        id: Types.ObjectId;
    }): Promise<import("../../../user/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
export {};
