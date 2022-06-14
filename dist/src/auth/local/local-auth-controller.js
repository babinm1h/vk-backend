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
exports.LocalAuthController = void 0;
const common_1 = require("@nestjs/common");
const AuthDtos_1 = require("../dto/AuthDtos");
const JwtGuard_1 = require("./guards/JwtGuard");
const localGuard_1 = require("./guards/localGuard");
const local_auth_service_1 = require("./local-auth.service");
let LocalAuthController = class LocalAuthController {
    constructor(localAuthService) {
        this.localAuthService = localAuthService;
    }
    register(dto) {
        return this.localAuthService.register(dto);
    }
    login(req) {
        return this.localAuthService.login(req.user);
    }
    getAuth(req) {
        return req.user;
    }
};
__decorate([
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthDtos_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], LocalAuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(localGuard_1.LocalGuard),
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LocalAuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuard_1.JwtGuard),
    (0, common_1.Get)("/get-auth"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LocalAuthController.prototype, "getAuth", null);
LocalAuthController = __decorate([
    (0, common_1.Controller)('/auth/local'),
    __metadata("design:paramtypes", [local_auth_service_1.LocalAuthService])
], LocalAuthController);
exports.LocalAuthController = LocalAuthController;
//# sourceMappingURL=local-auth-controller.js.map