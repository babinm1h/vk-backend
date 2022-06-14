import { Types } from "mongoose";
import { Server, Socket } from "socket.io";
import { DialogsService } from "src/dialogs/dialogs.service";
import { CreateMessageDto } from "./dtos/createMessage.dto";
import { MessagesService } from "./messages.service";
export declare class MessageGateway {
    private messageService;
    private dialogService;
    constructor(messageService: MessagesService, dialogService: DialogsService);
    server: Server;
    getDialog(dialogId: any): Promise<void>;
    sendMessage(dto: CreateMessageDto): Promise<void>;
    deleteMessage({ messageId, dialogId }: {
        messageId: Types.ObjectId;
        dialogId: Types.ObjectId;
    }): Promise<void>;
    handleJoinRoom(client: Socket, dialogId: string): Promise<void>;
    handleLeaveRoom(client: Socket, dialogId: string): Promise<void>;
}
