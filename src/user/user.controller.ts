import { Body, Controller, Get, HttpCode, Param, Put } from "@nestjs/common";
import { Types } from "mongoose";
import { IdValidationPiple } from "pipes/id.validation.pipe";
import { EditUserDto } from "./dto/editUser.dto";
import { UserService } from "./user.service";


@Controller('/user')

export class UserController {
    constructor(private userService: UserService) { }


    @Get("/by-id/:id")
    async getById(@Param('id', IdValidationPiple) id: string) {
        return this.userService.getById(new Types.ObjectId(id))
    }


    @Put("/profile")
    @HttpCode(200)
    async editProfile(@Body() dto: EditUserDto) {
        return
    }
}