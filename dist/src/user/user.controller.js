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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const mongoose_1 = require("mongoose");
const id_validation_pipe_1 = require("../../pipes/id.validation.pipe");
const JwtGuard_1 = require("../auth/local/guards/JwtGuard");
const editUser_dto_1 = require("./dto/editUser.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getById(id) {
        return this.userService.getById(new mongoose_1.Types.ObjectId(id));
    }
    async getProfile(id) {
        return this.userService.getProfile(id);
    }
    async editUser(dto, req, avatar) {
        return this.userService.editUser(req.user._id, Object.assign(Object.assign({}, dto), { avatar }));
    }
    async searchUser(searchQuery) {
        return this.userService.searchUser(searchQuery);
    }
    async toggleFollow(followUserId, req) {
        return this.userService.toggleFollow(req.user._id, followUserId);
    }
    async changeStatus(req, status) {
        return this.userService.changeStatus(req.user._id, status);
    }
    async getUserFollowers(req) {
        return this.userService.getFollowers(req.user._id);
    }
    async searchFollowers(req, searchQuery) {
        return this.userService.searchFollowers(searchQuery, req.user._id);
    }
};
__decorate([
    (0, common_1.Get)("/by-id/:id"),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id", id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    (0, common_1.Put)("/edit"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editUser_dto_1.EditUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUser", null);
__decorate([
    (0, common_1.Get)('/search/users'),
    __param(0, (0, common_1.Query)('searchQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUser", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Patch)('/follow/:id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleFollow", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Post)('/change/status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)("/my/followers"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserFollowers", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)("/my/followers/search"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)("searchQuery")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchFollowers", null);
UserController = __decorate([
    (0, common_1.Controller)('/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map