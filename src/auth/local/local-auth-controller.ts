import { Body, Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { AuthDto, RegisterDto } from "../dto/AuthDtos";
import { JwtGuard } from "./guards/JwtGuard";
import { LocalGuard } from "./guards/localGuard";
import { LocalAuthService } from "./local-auth.service";


@Controller('/auth/local')
export class LocalAuthController {

    constructor(private localAuthService: LocalAuthService) { }


    @Post("/register")
    register(@Body() dto: RegisterDto) {
        return this.localAuthService.register(dto)
    }


    @UseGuards(LocalGuard)
    @Post("/login")
    login(@Request() req) {
        return this.localAuthService.login(req.user)
    }


    @UseGuards(JwtGuard)
    @Get("/get-auth")
    getAuth(@Request() req) {
        return req.user
    }
}