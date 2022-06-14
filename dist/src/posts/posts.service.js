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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const comment_schema_1 = require("../comments/comment.schema");
const user_schema_1 = require("../user/user.schema");
const post_schema_1 = require("./post.schema");
let PostService = class PostService {
    constructor(postModel, commentModel, userModel, cloudinaryService) {
        this.postModel = postModel;
        this.commentModel = commentModel;
        this.userModel = userModel;
        this.cloudinaryService = cloudinaryService;
    }
    async getAll(page, limit = 3) {
        const posts = await this.postModel.find().sort({ createdAt: `desc` }).populate("user")
            .skip((page * limit) - limit).limit(limit);
        const totalCount = await this.postModel.find().count();
        let hasMore;
        if (posts.length * page < totalCount) {
            hasMore = true;
        }
        else {
            hasMore = false;
        }
        return { posts, totalCount, hasMore, page };
    }
    async getById(postId) {
        let post = await this.postModel.findById(postId).populate("user");
        return post;
    }
    async create(userId, { text, file }) {
        let post;
        if (file) {
            const image = await this.cloudinaryService.uploadImage(file);
            post = await this.postModel.create({ user: userId, text, image });
        }
        else {
            post = await this.postModel.create({ user: userId, text });
        }
        await post.populate("user", "name avatar ");
        await this.userModel.findByIdAndUpdate(userId, { $push: { posts: post._id } });
        return post;
    }
    async delete(id, userId) {
        const post = await this.postModel.findByIdAndDelete(id);
        await this.commentModel.deleteMany({ post: id });
        await this.userModel.findByIdAndUpdate(userId, { $pull: { posts: post._id } });
        return post;
    }
    async like(userId, postId) {
        const post = await this.postModel.findById(postId);
        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter(id => String(id) !== String(userId));
            post.likesCount -= 1;
        }
        else {
            post.likes.push(userId);
            post.likesCount += 1;
        }
        await post.save();
        return post._id;
    }
    async searchPosts(searchQuery) {
        const result = await this.postModel.find({ text: new RegExp(searchQuery, 'i') })
            .sort({ createdAt: 'desc' }).populate('user', "avatar name");
        return result;
    }
    async getByUser(userId) {
        const objectId = new mongoose_2.Types.ObjectId(userId);
        const posts = await this.postModel.find({ user: objectId }).populate("user", 'name avatar')
            .sort({ createdAt: 'desc' });
        return posts;
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(1, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=posts.service.js.map