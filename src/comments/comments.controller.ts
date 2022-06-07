import { Body, Controller, Post, UseGuards, Request, Delete, Param, Get } from "@nestjs/common";
import { Types } from "mongoose";
import { JwtGuard } from "src/auth/local/guards/JwtGuard";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dtos/createComment.dto";
import { IdValidationPipe } from "pipes/id.validation.pipe";

@Controller("/comments")
export class CommentsController {

    constructor(private commentsService: CommentsService) { }

    @UseGuards(JwtGuard)
    @Post('/')
    create(@Body() dto: CreateCommentDto, @Request() req) {
        return this.commentsService.create(dto, req.user._id)
    }


    @UseGuards(JwtGuard)
    @Delete('/:id')
    delete(@Param("id", IdValidationPipe) commentId: Types.ObjectId, @Body("postId") postId, @Request() req) {
        return this.commentsService.delete({ commentId, postId }, req.user._id)
    }

    @Get('/:id')
    getByPost(@Param('id', IdValidationPipe) postId: Types.ObjectId) {
        return this.commentsService.getFirstByPost(postId)
    }

    @Get('/all/:id')
    getAllByPost(@Param('id', IdValidationPipe) postId: Types.ObjectId) {
        return this.commentsService.getAllByPost(postId)
    }
}


