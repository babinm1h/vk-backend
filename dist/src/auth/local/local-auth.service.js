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
exports.LocalAuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../user/user.schema");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let LocalAuthService = class LocalAuthService {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            throw new common_1.BadRequestException("Пользователь с таким email не найден");
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            throw new common_1.BadRequestException("Неверный пароль");
        return user;
    }
    async register(dto) {
        const { email, password, name } = dto;
        const candidate = await this.userModel.findOne({ email });
        if (candidate)
            throw new common_1.BadRequestException("Такой email уже используется");
        const hashed = await bcrypt.hash(password, 6);
        const user = await this.userModel.create({ email, password: hashed, name });
        const payload = { id: user._id };
        const token = this.jwtService.sign(payload);
        return { token, user };
    }
    async login(user) {
        const payload = { id: user._id };
        const token = this.jwtService.sign(payload);
        return { user, token };
    }
};
LocalAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], LocalAuthService);
exports.LocalAuthService = LocalAuthService;
//# sourceMappingURL=local-auth.service.js.map