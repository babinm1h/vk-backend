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
    create(@Body() dto: CreateMessageDto, @Request() req) {
        return this.messagesService.create(dto, req.user._id)
    }


    @UseGuards(JwtGuard)
    @Delete('/:id')
    delete(@Param('id', IdValidationPipe) id: Types.ObjectId) {
        return this.messagesService.delete(id)
    }


    @UseGuards(JwtGuard)
    @Get('/')
    getByUserTo(@Body('id') id: Types.ObjectId, @Request() req) {
        return this.messagesService.getByUserTo(req.user._id, id)
    }
}