import { Module} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "src/posts/post.schema";
import { Comment, CommentSchema } from "./comment.schema";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    ],

    providers: [CommentsService],
    controllers: [CommentsController]
})
export class CommentsModule { }