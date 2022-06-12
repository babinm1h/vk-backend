import { BadRequestException, Injectable, NotFoundException, UnauthorizedException, } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { CommentDocument, Comment } from "src/comments/comment.schema";
import { EditUserDto } from "./dto/editUser.dto";
import { User, UserDocument } from "./user.schema";


@Injectable()

export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
        private cloudinaryService: CloudinaryService
    ) { }


    async getById(id: Types.ObjectId) {
        const user = await this.userModel.findById(id)
        if (!user) throw new UnauthorizedException('User not found')
        return user
    }


    async getProfile(id: Types.ObjectId) {
        let profile = await this.userModel.findById(id).populate({
            path: 'followers',
            options: {
                limit: 6,
                sort: { createdAt: "desc" },
                select: "name avatar"
            }
        })
            .populate({
                path: 'follows',
                options: {
                    limit: 6,
                    sort: { createdAt: "desc" },
                    select: "name avatar"
                }
            })

        return profile;
    }


    async editUser(id: Types.ObjectId, dto: EditUserDto) {
        const user = await this.userModel.findById(id)
        if (!user) throw new BadRequestException()

        user.name = dto.name
        user.gender = dto.gender
        user.country = dto.country
        user.birthDate = dto.birthDate
        if (dto.avatar) {
            const avatarUrl = await this.cloudinaryService.uploadImage(dto.avatar)
            user.avatar = avatarUrl as string
        }

        return await user.save()
    }


    async toggleFollow(authUserId: Types.ObjectId, followUserId: Types.ObjectId) {
        const authUser = await this.getById(authUserId)
        const followUser = await this.getById(followUserId)

        if (authUser.follows.includes(followUserId)) {
            authUser.follows = authUser.follows.filter(id => String(id) !== String(followUserId))
            followUser.followers = followUser.followers.filter(id => String(id) !== String(authUserId))
        } else {
            authUser.follows = [...authUser.follows, followUserId]
            followUser.followers = [...followUser.followers, authUserId]
        }

        await authUser.save()
        await followUser.save()

        return true
    }


    async searchUser(searchQuery: string) {
        const result = await this.userModel.find({ name: new RegExp(searchQuery, 'i') })
            .sort({ createdAt: 'desc' }).select("-password -__v")

        return result
    }

}