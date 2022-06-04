import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Types } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private userService: UserService) {
        super({
            secretOrKey: 'keyje',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        })
    }


    async validate(payload: { id: Types.ObjectId }) {
        const user = await this.userService.getById(payload.id)
        if (!user) throw new UnauthorizedException("Jwt Strategy validate error")
        return user
    }
}