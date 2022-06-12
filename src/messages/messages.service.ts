import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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


    async create({ text, senderId, dialogId }: CreateMessageDto) {
        const msg = await this.messageModel.create({ sender: senderId, text, dialog: dialogId })

        const dialog = await this.dialogModel.findById(dialogId)
        if (!dialog) throw new NotFoundException("Диалог не найден")
        dialog.latestMessage = msg;
        dialog.messages.push(new Types.ObjectId(msg._id))
        await dialog.save()

        return msg
    }


    async delete(messageId: Types.ObjectId, dialogId: Types.ObjectId) {
        const msg = await this.messageModel.findByIdAndDelete(messageId)
        if (!msg) throw new NotFoundException("сообщение не найдено")

        const dialog = await this.dialogModel.findById(dialogId).populate("messages")
        dialog.latestMessage = dialog.messages.slice(-1)[0] as any

        await dialog.save()

        return msg
    }


    async getByUserTo(userFrom: Types.ObjectId, userTo: Types.ObjectId) {
        return await this.messageModel.find({ userFrom, userTo })
            .populate("userFrom", "avatar name")
            .populate("userTo", "avatar name")
    }
}