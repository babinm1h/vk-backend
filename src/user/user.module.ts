import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { Comment, CommentSchema } from "src/comments/comment.schema";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./user.schema";
import { UserService } from "./user.service";


@Module({
    imports: [
        CloudinaryModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])
    ],
    controllers: [UserController],
    providers: [UserService, CloudinaryService]
})


export class UserModule { }