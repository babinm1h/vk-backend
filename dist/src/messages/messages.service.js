"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dialog_schema_1 = require("../dialogs/dialog.schema");
const messages_schema_1 = require("./messages.schema");
let MessagesService = class MessagesService {
    constructor(messageModel, dialogModel) {
        this.messageModel = messageModel;
        this.dialogModel = dialogModel;
    }
    async create({ text, senderId, dialogId }) {
        const msg = await this.messageModel.create({ sender: senderId, text, dialog: dialogId });
        const dialog = await this.dialogModel.findById(dialogId);
        if (!dialog)
            throw new common_1.NotFoundException("Диалог не найден");
        dialog.latestMessage = msg;
        dialog.messages.push(new mongoose_2.Types.ObjectId(msg._id));
        await dialog.save();
        return msg;
    }
    async delete(messageId, dialogId) {
        const msg = await this.messageModel.findByIdAndDelete(messageId);
        if (!msg)
            throw new common_1.NotFoundException("сообщение не найдено");
        const dialog = await this.dialogModel.findById(dialogId).populate("messages");
        dialog.latestMessage = dialog.messages.slice(-1)[0];
        await dialog.save();
        return msg;
    }
    async getByUserTo(userFrom, userTo) {
        return await this.messageModel.find({ userFrom, userTo })
            .populate("userFrom", "avatar name")
            .populate("userTo", "avatar name");
    }
};
MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(messages_schema_1.Message.name)),
    __param(1, (0, mongoose_1.InjectModel)(dialog_schema_1.Dialog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map