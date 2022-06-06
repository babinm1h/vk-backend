import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateMessageDto } from "./dtos/createMessage.dto";
import { Message, MessageDocument } from "./messages.schema";


@Injectable()
export class MessagesService {

    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>
    ) { }


    async create({ text, userTo }: CreateMessageDto, userFrom: Types.ObjectId) {
        const msg = await this.messageModel.create({ userFrom: userFrom, text, userTo })
        return msg
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