import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from "@nestjs/websockets"
import { Types } from "mongoose";
import { Server, Socket } from "socket.io";
import { DialogsService } from "src/dialogs/dialogs.service";
import { CreateMessageDto } from "./dtos/createMessage.dto";
import { MessagesService } from "./messages.service";


@WebSocketGateway(7000, { cors: true, transports: "polling" })
export class MessageGateway {

    constructor(
        private messageService: MessagesService,
        private dialogService: DialogsService
    ) { }

    @WebSocketServer() server: Server;


    @SubscribeMessage('message:get')
    async getDialog(@MessageBody('dialogId') dialogId: any) {
        if (!dialogId) return;
        const dialog = await this.dialogService.getOne(new Types.ObjectId(dialogId))

        this.server.emit('dialog', dialog)
    }


    @SubscribeMessage('message:send')
    async sendMessage(@MessageBody() dto: CreateMessageDto) {
        const message = await this.messageService.create(dto)
        await this.getDialog(dto.dialogId)
    }


    @SubscribeMessage('message:delete')
    async deleteMessage(@MessageBody() { messageId, dialogId }: { messageId: Types.ObjectId, dialogId: Types.ObjectId }) {
        await this.messageService.delete(new Types.ObjectId(messageId), new Types.ObjectId(dialogId))
        await this.getDialog(dialogId)
    }


    @SubscribeMessage('room:join')
    async handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody('dialogId') dialogId: string) {
        client.join(dialogId)
        client.emit("room:joined", dialogId)
        this.getDialog(dialogId)
    }


    @SubscribeMessage('room:leave')
    async handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody('dialogId') dialogId: string) {
        client.leave(dialogId)
        console.log('leave');
        client.emit("room:left", dialogId)
    }
}

