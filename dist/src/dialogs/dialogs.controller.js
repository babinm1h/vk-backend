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
exports.DialogsController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const id_validation_pipe_1 = require("../../pipes/id.validation.pipe");
const JwtGuard_1 = require("../auth/local/guards/JwtGuard");
const dialogs_service_1 = require("./dialogs.service");
let DialogsController = class DialogsController {
    constructor(dialogsService) {
        this.dialogsService = dialogsService;
    }
    getById(dialogId) {
        return this.dialogsService.getById(dialogId);
    }
    getAll(req) {
        return this.dialogsService.getAll(new mongoose_1.Types.ObjectId(req.user._id));
    }
    getOne(req, dialogId) {
        return this.dialogsService.getOne(dialogId);
    }
    create(req, userTo) {
        return this.dialogsService.create(new mongoose_1.Types.ObjectId(req.user._id), new mongoose_1.Types.ObjectId(userTo));
    }
};
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DialogsController.prototype, "getById", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DialogsController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)('/single/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DialogsController.prototype, "getOne", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Post)("/:id"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)("id", id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DialogsController.prototype, "create", null);
DialogsController = __decorate([
    (0, common_1.Controller)("/dialogs"),
    __metadata("design:paramtypes", [dialogs_service_1.DialogsService])
], DialogsController);
exports.DialogsController = DialogsController;
//# sourceMappingURL=dialogs.controller.js.map