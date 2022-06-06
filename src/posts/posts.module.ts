import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommentSchema, Comment } from "src/comments/comment.schema";
import { User, UserSchema } from "src/user/user.schema";
import { PostSchema, Post } from "./post.schema";
import { PostsController } from "./posts.controller";
import { PostService } from "./posts.service";



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],

    providers: [PostService],
    controllers: [PostsController]
})

export class PostsModule { }