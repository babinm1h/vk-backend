"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const comment_schema_1 = require("../comments/comment.schema");
const user_schema_1 = require("./user.schema");
let UserService = class UserService {
    constructor(userModel, CommentModel, cloudinaryService) {
        this.userModel = userModel;
        this.CommentModel = CommentModel;
        this.cloudinaryService = cloudinaryService;
    }
    async getById(id) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return user;
    }
    async getProfile(id) {
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
        });
        return profile;
    }
    async editUser(id, dto) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.BadRequestException();
        user.name = dto.name;
        user.gender = dto.gender;
        user.country = dto.country;
        user.birthDate = dto.birthDate;
        if (dto.avatar) {
            const avatarUrl = await this.cloudinaryService.uploadImage(dto.avatar);
            user.avatar = avatarUrl;
        }
        return await user.save();
    }
    async toggleFollow(authUserId, followUserId) {
        const authUser = await this.getById(authUserId);
        const followUser = await this.getById(followUserId);
        if (authUser.follows.includes(followUserId)) {
            authUser.follows = authUser.follows.filter(id => String(id) !== String(followUserId));
            followUser.followers = followUser.followers.filter(id => String(id) !== String(authUserId));
        }
        else {
            authUser.follows = [...authUser.follows, followUserId];
            followUser.followers = [...followUser.followers, authUserId];
        }
        await authUser.save();
        await followUser.save();
        return true;
    }
    async searchUser(searchQuery) {
        const result = await this.userModel.find({ name: new RegExp(searchQuery, 'i') })
            .sort({ createdAt: 'desc' }).select("-password -__v");
        return result;
    }
    async changeStatus(userId, status) {
        return await this.userModel.findByIdAndUpdate(userId, { $set: { status } });
    }
    async getFollowers(userId) {
        return await this.userModel.find({ follows: { $in: [userId] } }).select('avatar name');
    }
    async searchFollowers(searchQuery, userId) {
        return await this.userModel.find({
            follows: { $in: [userId] },
            name: new RegExp(searchQuery, 'i')
        }).select('avatar name');
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map