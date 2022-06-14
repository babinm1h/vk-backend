import mongoose, { Document, Types } from "mongoose";
export declare enum GenderEnum {
    male = "\u041C\u0443\u0436\u0447\u0438\u043D\u0430",
    female = "\u0416\u0435\u043D\u0449\u0438\u043D\u0430"
}
export declare type UserDocument = User & Document;
export declare class User {
    email: string;
    name: string;
    country: string;
    isVerified: boolean;
    avatar: string;
    followers: Types.ObjectId[];
    follows: Types.ObjectId[];
    gender: string;
    birthDate: string;
    password: string;
    status: string;
    likes: User[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any>, {}, {}, any>;
