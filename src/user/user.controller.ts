import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { IdValidationPipe } from "pipes/id.validation.pipe";
import { JwtGuard } from "src/auth/local/guards/JwtGuard";
import { EditUserDto } from "./dto/editUser.dto";
import { UserService } from "./user.service";


@Controller('/user')

export class UserController {
    constructor(private userService: UserService) { }


    @Get("/by-id/:id")
    async getById(@Param('id', IdValidationPipe) id: string) {
        return this.userService.getById(new Types.ObjectId(id))
    }

    @Get("/:id")
    async getProfile(@Param("id", IdValidationPipe) id: Types.ObjectId) {
        return this.userService.getProfile(id)
    }


    @UseGuards(JwtGuard)
    @Put("/edit")
    async editUser(@Body() dto: EditUserDto, @Request() req) {
        return this.userService.editUser(req.user._id, dto)
    }


    @Get('/search/users')
    async searchUser(@Query('searchQuery') searchQuery: string) {
        return this.userService.searchUser(searchQuery)
    }


    @UseGuards(JwtGuard)
    @Patch('/follow/:id')
    async toggleFollow(@Param('id', IdValidationPipe) followUserId: Types.ObjectId, @Request() req) {
        return this.userService.toggleFollow(req.user._id, followUserId)
    }
}