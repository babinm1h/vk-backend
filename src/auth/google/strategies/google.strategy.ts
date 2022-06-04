import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";



export class GoogleStrategy extends PassportStrategy(Strategy, "google") {

    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:7777/api/auth/google/redirect',
            scope: ['email', 'profile']
        })
    }


    async validate(accessToken: string, refreshToken: string, profile: any,)
        : Promise<any> {
        const { name, emails, photos } = profile
        const user = {
            email: emails[0].value,
            name: name.givenName + " " + name.familyName,
            picture: photos[0].value,
            accessToken
        }

        return {}
    }


}   