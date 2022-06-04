import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { User, UserSchema } from "src/user/user.schema";
import { UserService } from "src/user/user.service";
import { LocalAuthController } from "./local-auth-controller";
import { LocalAuthService } from "./local-auth.service";
import { JwtStrategy } from "./strategies/JwtStrategy";
import { LocalStrategy } from "./strategies/LocalStrategy";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule,
        UserModule,
        JwtModule.register({
            secret: 'keyje',
            signOptions: { expiresIn: "30d" }
        })
    ],

    providers: [LocalAuthService, LocalStrategy, JwtStrategy, UserService],
    controllers: [LocalAuthController]
})

export class LocalAuthModule { }