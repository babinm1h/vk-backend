import { Injectable } from "@nestjs/common";




@Injectable()
export class AuthService {


    async googleLogin(req) {
        return req.user
    }

}