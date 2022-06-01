import { IsEnum, IsString } from "class-validator"
import { GenderEnum } from "../user.schema"


export class EditUserDto {
    @IsString()
    name: string

    @IsString()
    city: string

    @IsString()
    avatar: string

    @IsString()
    birthDate: string

    @IsEnum(GenderEnum)
    gender: string
}