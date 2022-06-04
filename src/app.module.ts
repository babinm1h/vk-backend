import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleAuthModule } from './auth/google/google-auth.module';
import { LocalAuthModule } from './auth/local/local-auth.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    GoogleAuthModule,
    LocalAuthModule
  ],
  controllers: [],
  providers: [],
})


export class AppModule { }
