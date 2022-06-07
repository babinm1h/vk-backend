import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Dialog, DialogDocument } from "src/dialogs/dialog.schema";
import { CreateMessageDto } from "./dtos/createMessage.dto";
import { Message, MessageDocument } from "./messages.schema";


@Injectable()
export class MessagesService {

    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        @InjectModel(Dialog.name) private dialogModel: Model<DialogDocument>
    ) { }


    async create({ text, userTo, dialogId }: CreateMessageDto, userFrom: Types.ObjectId) {
        const msg = await this.messageModel.create({ userFrom: userFrom, text, userTo })

        const dialog = await this.dialogModel.findById(dialogId)
        if (!dialog) throw new NotFoundException("Диалог не найден")

        dialog.messages = [...dialog.messages, msg._id]
        return await dialog.save()
    }


    async delete(messageId: Types.ObjectId) {
        const msg = await this.messageModel.findByIdAndDelete(messageId)
        return msg
    }


    async getByUserTo(userFrom: Types.ObjectId, userTo: Types.ObjectId) {
        return await this.messageModel.find({ userFrom, userTo })
            .populate("userFrom", "avatar name")
            .populate("userTo", "avatar name")
    }
}