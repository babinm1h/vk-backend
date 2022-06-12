import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Types } from "mongoose";
import { IdValidationPipe } from "pipes/id.validation.pipe";
import { JwtGuard } from "src/auth/local/guards/JwtGuard";
import { CreatePostDto } from "./dtos/createPost.dto";
import { PostService } from "./posts.service";



@Controller("/posts")
export class PostsController {

    constructor(private postsService: PostService) { }

    @Get('/')
    getAll() {
        return this.postsService.getAll()
    }

    @Get('/byid/:id')
    getById(@Param('id', IdValidationPipe) postId: Types.ObjectId) {
        return this.postsService.getById(postId)
    }


    @UseGuards(JwtGuard)
    @Post('/')
    @UseInterceptors(FileInterceptor('file'))
    create(@Request() req, @Body('text') text, @UploadedFile() file) {
        return this.postsService.create(req.user._id, { text, file })
    }


    @UseGuards(JwtGuard)
    @Delete("/:id")
    delete(@Param('id') id: Types.ObjectId, @Request() req) {
        return this.postsService.delete(id, req.user._id)
    }


    @UseGuards(JwtGuard)
    @Put('/edit/:id')
    edit(@Param('id') id: Types.ObjectId) {
        return
    }


    @UseGuards(JwtGuard)
    @Put("/like/:id")
    like(@Request() req, @Param("id", IdValidationPipe) postId: Types.ObjectId) {
        return this.postsService.like(req.user._id, postId)
    }


    @Get("/search")
    searchPosts(@Query("searchQuery") searchQuery: string) {
        return this.postsService.searchPosts(searchQuery)
    }


    @Get("/for/profile/:id")
    getByUser(@Param("id") userId: Types.ObjectId) {
        return this.postsService.getByUser(userId)
    }
}