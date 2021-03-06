"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalAuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const cloudinary_service_1 = require("../../cloudinary/cloudinary.service");
const comment_schema_1 = require("../../comments/comment.schema");
const user_module_1 = require("../../user/user.module");
const user_schema_1 = require("../../user/user.schema");
const user_service_1 = require("../../user/user.service");
const local_auth_controller_1 = require("./local-auth-controller");
const local_auth_service_1 = require("./local-auth.service");
const JwtStrategy_1 = require("./strategies/JwtStrategy");
const LocalStrategy_1 = require("./strategies/LocalStrategy");
let LocalAuthModule = class LocalAuthModule {
};
LocalAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: comment_schema_1.Comment.name, schema: comment_schema_1.CommentSchema }]),
            passport_1.PassportModule,
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: 'keyje',
                signOptions: { expiresIn: "30d" }
            })
        ],
        providers: [local_auth_service_1.LocalAuthService, LocalStrategy_1.LocalStrategy, JwtStrategy_1.JwtStrategy, user_service_1.UserService, cloudinary_service_1.CloudinaryService],
        controllers: [local_auth_controller_1.LocalAuthController]
    })
], LocalAuthModule);
exports.LocalAuthModule = LocalAuthModule;
//# sourceMappingURL=local-auth.module.js.map