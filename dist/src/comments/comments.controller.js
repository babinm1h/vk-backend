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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const JwtGuard_1 = require("../auth/local/guards/JwtGuard");
const comments_service_1 = require("./comments.service");
const createComment_dto_1 = require("./dtos/createComment.dto");
const id_validation_pipe_1 = require("../../pipes/id.validation.pipe");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    create(dto, req) {
        return this.commentsService.create(dto, req.user._id);
    }
    delete(commentId, postId, req) {
        return this.commentsService.delete({ commentId, postId }, req.user._id);
    }
    getByPost(postId) {
        return this.commentsService.getFirstByPost(postId);
    }
    getAllByPost(postId) {
        return this.commentsService.getAllByPost(postId);
    }
};
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createComment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)("id", id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)("postId")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, Object, Object]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "getByPost", null);
__decorate([
    (0, common_1.Get)('/all/:id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "getAllByPost", null);
CommentsController = __decorate([
    (0, common_1.Controller)("/comments"),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map