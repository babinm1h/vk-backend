import { v2 } from 'cloudinary';

export const CloudinaryProvider = {

    provide: "cloudinary",
    useFactory: () => {
        return v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUDNAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        })
    }
}
