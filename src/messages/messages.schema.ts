import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/user.schema";


export type MessageDocument = Document & Message


@Schema({ timestamps: true })
export class Message {

    @Prop({ type: Types.ObjectId, ref: "User" })
    userFrom: User

    @Prop({ type: Types.ObjectId, ref: "User" })
    userTo: User

    @Prop()
    text: string
}


export const MessageSchema = SchemaFactory.createForClass(Message)