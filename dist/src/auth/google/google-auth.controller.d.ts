import { GoogleAuthService } from "./google-auth.service";
export declare class GoogleAuthController {
    private authService;
    constructor(authService: GoogleAuthService);
    googleAuth(req: any): Promise<void>;
    googleRedirect(req: any): Promise<any>;
    googleLogout(req: any): Promise<void>;
}
