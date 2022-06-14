"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const google_auth_module_1 = require("./auth/google/google-auth.module");
const local_auth_module_1 = require("./auth/local/local-auth.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const comments_module_1 = require("./comments/comments.module");
const dialogs_module_1 = require("./dialogs/dialogs.module");
const messages_module_1 = require("./messages/messages.module");
const posts_module_1 = require("./posts/posts.module");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            user_module_1.UserModule,
            google_auth_module_1.GoogleAuthModule,
            local_auth_module_1.LocalAuthModule,
            posts_module_1.PostsModule,
            comments_module_1.CommentsModule,
            messages_module_1.MessageModule,
            dialogs_module_1.DialogsModule,
            cloudinary_module_1.CloudinaryModule,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.memoryStorage)()
            })
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map