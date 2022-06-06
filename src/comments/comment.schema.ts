import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Post } from "src/posts/post.schema";
import { User } from "src/user/user.schema";


export type CommentDocument = Document & Comment


@Schema({ timestamps: true })
export class Comment {

    @Prop({ type: Types.ObjectId, ref: "User" })
    user: User

    @Prop()
    text: string

    @Prop({ type: Types.ObjectId, ref: "Post" })
    post: Post
}


export const CommentSchema = SchemaFactory.createForClass(Comment)