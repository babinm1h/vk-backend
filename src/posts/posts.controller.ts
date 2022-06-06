import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { IdValidationPipe } from "pipes/id.validation.pipe";
import { JwtGuard } from "src/auth/local/guards/JwtGuard";
import { PostService } from "./posts.service";



@Controller("/posts")
export class PostsController {

    constructor(private postsService: PostService) { }

    @Get('/')
    getAll() {
        return this.postsService.getAll()
    }


    @UseGuards(JwtGuard)
    @Post('/')
    create(@Request() req, @Body('text') text: string) {
        return this.postsService.create(req.user._id, text)
    }


    @UseGuards(JwtGuard)
    @Delete("/:id")
    delete(@Param('id') id: Types.ObjectId, @Request() req) {
        return this.postsService.delete(id, req.user._id)
    }


    @UseGuards(JwtGuard)
    @Put('/edit/:id')
    edit(@Param('id') id: Types.ObjectId) {

    }


    @UseGuards(JwtGuard)
    @Put("/like/:id")
    like(@Request() req, @Param("id", IdValidationPipe) postId: Types.ObjectId) {
        return this.postsService.like(req.user._id, postId)
    }


    @UseGuards(JwtGuard)
    @Put("/unlike/:id")
    unlike(@Request() req, @Param("id", IdValidationPipe) postId: Types.ObjectId) {
        return this.postsService.unlike(req.user._id, postId)
    }
}