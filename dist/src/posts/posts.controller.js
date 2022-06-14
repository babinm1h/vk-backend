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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const mongoose_1 = require("mongoose");
const id_validation_pipe_1 = require("../../pipes/id.validation.pipe");
const JwtGuard_1 = require("../auth/local/guards/JwtGuard");
const posts_service_1 = require("./posts.service");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    getAll(page) {
        page = page || 1;
        return this.postsService.getAll(+page);
    }
    getById(postId) {
        return this.postsService.getById(postId);
    }
    create(req, text, file) {
        return this.postsService.create(req.user._id, { text, file });
    }
    delete(id, req) {
        return this.postsService.delete(id, req.user._id);
    }
    edit(id) {
        return;
    }
    like(req, postId) {
        return this.postsService.like(req.user._id, postId);
    }
    searchPosts(searchQuery) {
        return this.postsService.searchPosts(searchQuery);
    }
    getByUser(userId) {
        return this.postsService.getByUser(userId);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/byid/:id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getById", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Post)('/'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('text')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Put)('/edit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "edit", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Put)("/like/:id"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id", id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "like", null);
__decorate([
    (0, common_1.Get)("/search"),
    __param(0, (0, common_1.Query)("searchQuery")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "searchPosts", null);
__decorate([
    (0, common_1.Get)("/for/profile/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getByUser", null);
PostsController = __decorate([
    (0, common_1.Controller)("/posts"),
    __metadata("design:paramtypes", [posts_service_1.PostService])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map