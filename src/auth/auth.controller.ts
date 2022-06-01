import { Controller, Get, Post, Request } from "@nestjs/common";
import { GoogleAuth } from "src/user/decorators/auth.decorator";
import { AuthService } from "./auth.service";


@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @GoogleAuth()
    @Get('')
    async googleAuth(@Request() req) {

    }


    @GoogleAuth()
    @Get("/google/redirect")
    async googleRedirect(@Request() req) {
        return this.authService.googleLogin(req)
    }
}