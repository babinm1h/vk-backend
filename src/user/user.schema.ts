import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export enum GenderEnum {
    male = 'male',
    female = 'female'
}


export type UserDocument = User & Document;


@Schema({ timestamps: true })
export class User {

    @Prop({ unique: true })
    email: string

    @Prop({})
    name: string

    @Prop({})
    city: string

    @Prop({ default: false })
    isVerified: boolean

    @Prop({})
    avatar: string

    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: "User" }] })
    followers: User[]

    @Prop({ enum: GenderEnum })
    gender: string

    @Prop()
    birthDate: string
}


export const UserSchema = SchemaFactory.createForClass(User)