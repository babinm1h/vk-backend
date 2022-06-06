import { Body, Controller, Post, UseGuards, Request, Delete, Param } from "@nestjs/common";
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
    delete(@Param("id", IdValidationPipe) id: Types.ObjectId, @Body("postId") postId, @Request() req) {
        return this.commentsService.delete({ commentId: id, postId }, req.user._id)
    }
}


