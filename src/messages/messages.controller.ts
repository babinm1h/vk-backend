import { Body, Controller, Delete, Post, UseGuards, Request, Get, Param } from "@nestjs/common";
import { Types } from "mongoose";
import { IdValidationPipe } from "pipes/id.validation.pipe";
import { JwtGuard } from "src/auth/local/guards/JwtGuard";
import { CreateMessageDto } from "./dtos/createMessage.dto";
import { MessagesService } from "./messages.service";


@Controller('/messages')
export class MessagesController {

    constructor(private messagesService: MessagesService) { }

    @UseGuards(JwtGuard)
    @Post('/')
    create(@Body('text') text: string, @Body('dialogId') dialogId: Types.ObjectId, @Request() req) {
        return this.messagesService.create({ senderId: req.user._id, dialogId, text })
    }


    @UseGuards(JwtGuard)
    @Delete('/:id')
    delete(@Param('id', IdValidationPipe) id: Types.ObjectId) {
        
    }


    @UseGuards(JwtGuard)
    @Get('/')
    getByUserTo(@Body('id') id: Types.ObjectId, @Request() req) {
        return this.messagesService.getByUserTo(req.user._id, id)
    }
}