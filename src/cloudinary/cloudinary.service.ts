import { Injectable } from "@nestjs/common";
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {

    async uploadImage(file: Express.Multer.File,) {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({ folder: "vk" }, (error, result) => {
                if (error) return reject(error + " cloudinary error");
                resolve(result.secure_url);
            }).end(file.buffer)

        });
    }

}