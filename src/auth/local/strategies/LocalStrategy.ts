import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LocalAuthService } from "../local-auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private localAuthService: LocalAuthService) {
        super({
            usernameField: "email",
            passwordField: "password"
        })
    }

    async validate(email: string, password: string) {
        const user = await this.localAuthService.validateUser(email, password)
        if (!user) throw new UnauthorizedException('Local strategy validate error')
        return user
    }

}