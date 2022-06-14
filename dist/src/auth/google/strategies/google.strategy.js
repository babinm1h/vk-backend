"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, "google") {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:7777/api/auth/google/redirect',
            scope: ['email', 'profile']
        });
    }
    async validate(accessToken, refreshToken, profile) {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            name: name.givenName + " " + name.familyName,
            picture: photos[0].value,
            accessToken
        };
        return {};
    }
}
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=google.strategy.js.map