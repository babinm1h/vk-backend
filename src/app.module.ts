import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { GoogleAuthModule } from './auth/google/google-auth.module';
import { LocalAuthModule } from './auth/local/local-auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommentsModule } from './comments/comments.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { MessageModule } from './messages/messages.module';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    GoogleAuthModule,
    LocalAuthModule,
    PostsModule,
    CommentsModule,
    MessageModule,
    DialogsModule,
    CloudinaryModule,
    MulterModule.register({
      storage: memoryStorage()
    })
  ],
  controllers: [],
  providers: [],
})


export class AppModule { }
