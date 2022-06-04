import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/user.schema";
import { GoogleAuthController } from "./google-auth.controller";
import { GoogleAuthService } from "./google-auth.service";
import { GoogleStrategy } from "./strategies/google.strategy";



@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [GoogleAuthController],
    providers: [GoogleAuthService, GoogleStrategy]
})


export class GoogleAuthModule { }