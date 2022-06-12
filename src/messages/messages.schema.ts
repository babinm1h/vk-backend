import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Dialog } from "src/dialogs/dialog.schema";
import { User } from "src/user/user.schema";


export type MessageDocument = Document & Message


@Schema({ timestamps: true })
export class Message {

    @Prop()
    text: string

    @Prop({ type: Types.ObjectId, ref: "Dialog" })
    dialog: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: "User" })
    sender: Types.ObjectId
}


export const MessageSchema = SchemaFactory.createForClass(Message)


