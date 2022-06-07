import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Dialog, DialogSchema } from "src/dialogs/dialog.schema";
import { MessagesController } from "./messages.controller";
import { Message, MessageSchema } from "./messages.schema";
import { MessagesService } from "./messages.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
        MongooseModule.forFeature([{ name: Dialog.name, schema: DialogSchema }])
    ],

    providers: [MessagesService],
    controllers: [MessagesController]
})

export class MessageModule { }