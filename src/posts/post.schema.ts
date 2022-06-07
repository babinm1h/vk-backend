import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose'
import { Comment } from "src/comments/comment.schema";
import { User } from "src/user/user.schema";


export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {

    @Prop({ required: true })
    text: string

    @Prop()
    image: string

    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    user: User

    @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
    likes: Types.ObjectId[]

    @Prop({ default: 0, min: 0 })
    likesCount: number

}


export const PostSchema = SchemaFactory.createForClass(Post)