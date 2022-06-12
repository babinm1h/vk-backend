import { Controller, Get, Param, Post, Req, Request, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { IdValidationPipe } from "pipes/id.validation.pipe";
import { JwtGuard } from "src/auth/local/guards/JwtGuard";
import { DialogsService } from "./dialogs.service";


@Controller("/dialogs")
export class DialogsController {

    constructor(private dialogsService: DialogsService) { }


    @UseGuards(JwtGuard)
    @Get('/:id')
    getById(@Param('id') dialogId: Types.ObjectId) {
        return this.dialogsService.getById(dialogId)
    }


    @UseGuards(JwtGuard)
    @Get('/')
    getAll(@Request() req) {
        return this.dialogsService.getAll(new Types.ObjectId(req.user._id))
    }


    @UseGuards(JwtGuard)
    @Get('/single/:id')
    getOne(@Request() req, @Param("id") dialogId: Types.ObjectId) {
        return this.dialogsService.getOne(dialogId)
    }

    @UseGuards(JwtGuard)
    @Post("/:id")
    create(@Request() req, @Param("id", IdValidationPipe) userTo: Types.ObjectId) {
        return this.dialogsService.create(new Types.ObjectId(req.user._id), new Types.ObjectId(userTo))
    }
}