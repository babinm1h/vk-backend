import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "src/messages/messages.schema";
import { Dialog, DialogSchema } from "./dialog.schema";
import { DialogsController } from "./dialogs.controller";
import { DialogsService } from "./dialogs.service";



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Dialog.name, schema: DialogSchema }]),
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])
    ],

    providers: [DialogsService],
    controllers: [DialogsController]
})


export class DialogsModule { }

