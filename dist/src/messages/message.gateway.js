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
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const mongoose_1 = require("mongoose");
const socket_io_1 = require("socket.io");
const dialogs_service_1 = require("../dialogs/dialogs.service");
const createMessage_dto_1 = require("./dtos/createMessage.dto");
const messages_service_1 = require("./messages.service");
let MessageGateway = class MessageGateway {
    constructor(messageService, dialogService) {
        this.messageService = messageService;
        this.dialogService = dialogService;
    }
    async getDialog(dialogId) {
        if (!dialogId)
            return;
        const dialog = await this.dialogService.getOne(new mongoose_1.Types.ObjectId(dialogId));
        this.server.emit('dialog', dialog);
    }
    async sendMessage(dto) {
        const message = await this.messageService.create(dto);
        await this.getDialog(dto.dialogId);
    }
    async deleteMessage({ messageId, dialogId }) {
        await this.messageService.delete(new mongoose_1.Types.ObjectId(messageId), new mongoose_1.Types.ObjectId(dialogId));
        await this.getDialog(dialogId);
    }
    async handleJoinRoom(client, dialogId) {
        client.join(dialogId);
        client.emit("room:joined", dialogId);
        this.getDialog(dialogId);
    }
    async handleLeaveRoom(client, dialogId) {
        client.leave(dialogId);
        console.log('leave');
        client.emit("room:left", dialogId);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message:get'),
    __param(0, (0, websockets_1.MessageBody)('dialogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "getDialog", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message:send'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMessage_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "sendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message:delete'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "deleteMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('room:join'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)('dialogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('room:leave'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)('dialogId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "handleLeaveRoom", null);
MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(80, { cors: true }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        dialogs_service_1.DialogsService])
], MessageGateway);
exports.MessageGateway = MessageGateway;
//# sourceMappingURL=message.gateway.js.map