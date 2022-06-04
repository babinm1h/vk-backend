import { Controller, Get, Post, Request } from "@nestjs/common";
import { GoogleAuth } from "src/user/decorators/auth.decorator";
import { GoogleAuthService } from "./google-auth.service";


@Controller('/auth/google')
export class GoogleAuthController {
    constructor(private authService: GoogleAuthService) { }


    @GoogleAuth()
    @Get('/login')
    async googleAuth(@Request() req) {

    }


    @GoogleAuth()
    @Get("/redirect")
    async googleRedirect(@Request() req) {
        return this.authService.googleLogin(req)
    }


    @GoogleAuth()
    @Get("/logout")
    async googleLogout(@Request() req) {
        console.log(req);
    }
}