"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: true });
    const PORT = process.env.PORT || 7777;
    app.enableCors({
        origin: ['http://localhost:3000', 'https://vk-frontend-six.vercel.app/'],
        credentials: true
    });
    app.setGlobalPrefix("api");
    app.use(session({
        secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(PORT, () => console.log(`started ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map