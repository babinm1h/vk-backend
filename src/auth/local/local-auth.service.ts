import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/user.schema";
import * as bcrypt from 'bcryptjs'
import { AuthDto, RegisterDto } from "../dto/AuthDtos";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class LocalAuthService {

    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userModel.findOne({ email })
        if (!user) throw new BadRequestException("Пользователь с таким email не найден")

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) throw new BadRequestException("Неверный пароль")

        return user
    }


    async register(dto: RegisterDto) {
        const { email, password, name } = dto
        const candidate = await this.userModel.findOne({ email })
        if (candidate) throw new BadRequestException("Такой email уже используется")

        const hashed = await bcrypt.hash(password, 6)
        const user = await this.userModel.create({ email, password: hashed, name })

        const payload = { id: user._id }
        const token = this.jwtService.sign(payload, { expiresIn: '30d' })
        return { token, user }
    }


    async login(user: any) {
        const payload = { id: user._id }
        const token = this.jwtService.sign(payload, { expiresIn: '30d' })
        return { user, token }
    }
}