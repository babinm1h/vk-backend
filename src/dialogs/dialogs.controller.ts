import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
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
}