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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("../posts/post.schema");
const comment_schema_1 = require("./comment.schema");
let CommentsService = class CommentsService {
    constructor(commentModel, postModel) {
        this.commentModel = commentModel;
        this.postModel = postModel;
    }
    async create({ post, text }, user) {
        return await this.commentModel.create({ post, user, text });
    }
    async delete({ postId, commentId }, user) {
        await this.commentModel.findByIdAndDelete(commentId);
        return commentId;
    }
    async getFirstByPost(postId) {
        const firstComments = await this.commentModel.find({ post: postId })
            .populate("user", 'name avatar').limit(2);
        const commsCount = await this.commentModel.find({ post: postId }).count();
        return { count: commsCount, firstComments };
    }
    async getAllByPost(postId) {
        const comments = await this.commentModel.find({ post: postId }).populate("user", 'name avatar');
        return { count: comments.length, comments };
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __param(1, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map