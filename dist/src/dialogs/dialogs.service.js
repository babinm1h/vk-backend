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
exports.DialogsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const messages_schema_1 = require("../messages/messages.schema");
const dialog_schema_1 = require("./dialog.schema");
let DialogsService = class DialogsService {
    constructor(dialogModel, messageModel) {
        this.dialogModel = dialogModel;
        this.messageModel = messageModel;
    }
    async getById(dialogId) {
        return await this.dialogModel.findById(dialogId).populate({
            path: 'messages',
            populate: ['userFrom', 'userTo']
        });
    }
    async create(userFrom, userTo) {
        const candidate = await this.dialogModel.findOne({
            users: { $all: [userFrom, userTo] }
        });
        if (candidate)
            return candidate;
        return await (await this.dialogModel.create({ users: [userFrom, userTo] }))
            .populate('users', "name avatar");
    }
    async getAll(userId) {
        if (!userId)
            throw new common_1.UnauthorizedException('not allowed');
        return await this.dialogModel.find({
            users: { $in: [userId] }
        }).populate("users", 'avatar name').populate('latestMessage');
    }
    async getOne(dialogId) {
        let dialog = await this.dialogModel.findById(new mongoose_2.Types.ObjectId(dialogId)).populate('messages')
            .populate('users', 'name avatar').populate('latestMessage', "text");
        dialog = await this.messageModel.populate(dialog, { path: "messages.sender" });
        if (!dialog)
            throw new common_1.NotFoundException("Диалог не найден");
        return dialog;
    }
};
DialogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(dialog_schema_1.Dialog.name)),
    __param(1, (0, mongoose_1.InjectModel)(messages_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DialogsService);
exports.DialogsService = DialogsService;
//# sourceMappingURL=dialogs.service.js.map