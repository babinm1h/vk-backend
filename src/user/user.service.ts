import { Injectable, NotFoundException, UnauthorizedException, } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { EditUserDto } from "./dto/editUser.dto";
import { User, UserDocument } from "./user.schema";


@Injectable()

export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getById(id: Types.ObjectId) {
        const user = await this.userModel.findById(id)
        if (!user) throw new UnauthorizedException('User not found')
        return user
    }


    async editUser(id: Types.ObjectId, dto: EditUserDto) {
        const user = await this.userModel.findById(id)

        user.name = dto.name
        user.gender = dto.gender
        user.avatar = dto.avatar
        user.city = dto.city
        user.birthDate = dto.birthDate

        return await user.save()
    }


}