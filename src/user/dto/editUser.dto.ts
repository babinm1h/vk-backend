import { IsEnum, IsString } from "class-validator"
import { GenderEnum } from "../user.schema"


export class EditUserDto {
    @IsString()
    name: string

    @IsString()
    country: string

    avatar: Express.Multer.File

    @IsString()
    birthDate: string

    @IsEnum(GenderEnum)
    gender: string
}