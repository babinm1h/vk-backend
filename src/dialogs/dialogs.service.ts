import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Dialog, DialogDocument } from "./dialog.schema";



@Injectable()
export class DialogsService {

    constructor(@InjectModel(Dialog.name) private dialogModel: Model<DialogDocument>) { }

    async getById(dialogId: Types.ObjectId) {
        return await this.dialogModel.findById(dialogId).populate({
            path: 'messages',
            populate: ['userFrom', 'userTo']
        })
    }

    
}