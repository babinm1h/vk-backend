/// <reference types="multer" />
export declare class EditUserDto {
    name: string;
    country: string;
    avatar: Express.Multer.File;
    birthDate: string;
    gender: string;
}
