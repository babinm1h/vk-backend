import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Message, MessageDocument } from "src/messages/messages.schema";
import { Dialog, DialogDocument } from "./dialog.schema";



@Injectable()
export class DialogsService {

    constructor(
        @InjectModel(Dialog.name) private dialogModel: Model<DialogDocument>,
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>
    ) { }

    async getById(dialogId: Types.ObjectId) {
        return await this.dialogModel.findById(dialogId).populate({
            path: 'messages',
            populate: ['userFrom', 'userTo']
        })
    }


    async create(userFrom: Types.ObjectId, userTo: Types.ObjectId) {
        const candidate = await this.dialogModel.findOne({
            users: { $all: [userFrom, userTo] }
        })

        if (candidate) return candidate;

        return await (await this.dialogModel.create({ users: [userFrom, userTo] }))
            .populate('users', "name avatar")
    }


    async getAll(userId: Types.ObjectId) {
        if (!userId) throw new UnauthorizedException('not allowed')

        return await this.dialogModel.find({
            users: { $in: [userId] }
        }).populate("users", 'avatar name').populate('latestMessage')
    }



    async getOne(dialogId: Types.ObjectId) {
        let dialog = await this.dialogModel.findById(new Types.ObjectId(dialogId)).populate('messages')
            .populate('users', 'name avatar').populate('latestMessage', "text") as any

        dialog = await this.messageModel.populate(dialog, { path: "messages.sender" })

        if (!dialog) throw new NotFoundException("Диалог не найден")

        return dialog
    }
}