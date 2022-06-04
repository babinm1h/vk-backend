import { Injectable } from "@nestjs/common";




@Injectable()
export class GoogleAuthService {


    async googleLogin(req) {
        return req.user
    }

}