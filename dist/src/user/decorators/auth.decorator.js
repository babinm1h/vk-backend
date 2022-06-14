"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuth = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const GoogleAuth = () => (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google'));
exports.GoogleAuth = GoogleAuth;
//# sourceMappingURL=auth.decorator.js.map