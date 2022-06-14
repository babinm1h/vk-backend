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
exports.GoogleAuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../../user/decorators/auth.decorator");
const google_auth_service_1 = require("./google-auth.service");
let GoogleAuthController = class GoogleAuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async googleAuth(req) {
    }
    async googleRedirect(req) {
        return this.authService.googleLogin(req);
    }
    async googleLogout(req) {
        console.log(req);
    }
};
__decorate([
    (0, auth_decorator_1.GoogleAuth)(),
    (0, common_1.Get)('/login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleAuthController.prototype, "googleAuth", null);
__decorate([
    (0, auth_decorator_1.GoogleAuth)(),
    (0, common_1.Get)("/redirect"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleAuthController.prototype, "googleRedirect", null);
__decorate([
    (0, auth_decorator_1.GoogleAuth)(),
    (0, common_1.Get)("/logout"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GoogleAuthController.prototype, "googleLogout", null);
GoogleAuthController = __decorate([
    (0, common_1.Controller)('/auth/google'),
    __metadata("design:paramtypes", [google_auth_service_1.GoogleAuthService])
], GoogleAuthController);
exports.GoogleAuthController = GoogleAuthController;
//# sourceMappingURL=google-auth.controller.js.map