import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Dialog, DialogSchema } from "./dialog.schema";
import { DialogsController } from "./dialogs.controller";
import { DialogsService } from "./dialogs.service";



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Dialog.name, schema: DialogSchema }])
    ],

    providers: [DialogsService],
    controllers: [DialogsController]
})


export class DialogsModule { }