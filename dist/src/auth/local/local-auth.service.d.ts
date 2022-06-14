import { Model } from "mongoose";
import { User, UserDocument } from "src/user/user.schema";
import { RegisterDto } from "../dto/AuthDtos";
import { JwtService } from "@nestjs/jwt";
export declare class LocalAuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: Model<UserDocument>);
    validateUser(email: string, password: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    register(dto: RegisterDto): Promise<{
        token: string;
        user: User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
    }>;
    login(user: any): Promise<{
        user: any;
        token: string;
    }>;
}
