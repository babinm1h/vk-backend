import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Message } from "src/messages/messages.schema";
import { Post } from "src/posts/post.schema";
import { User } from "src/user/user.schema";


export type DialogDocument = Document & Dialog


@Schema({ timestamps: true })
export class Dialog {

    @Prop({ type: [{ type: Types.ObjectId, ref: "Message" }], default: [] })
    messages: Types.ObjectId[]

    @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
    users: Types.ObjectId[]

    @Prop({ type: Types.ObjectId, ref: "Message" })
    latestMessage: Message
}


export const DialogSchema = SchemaFactory.createForClass(Dialog)
