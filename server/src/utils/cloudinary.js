import { v2 as cloudinary } from 'cloudinary';

import { config } from 'dotenv';
config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadFileToCloudinary = async (filePath) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });

        return uploadResponse;
    } catch (error) {
        console.log("❌ Cloudinary upload error: ", error);
        return null;
    }
}

export const deleteFileFromCloudinary = async (publicId) => {
    try {
        console.log("publicId: ", publicId)
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.log("❌ Cloudinary delete error: ", error);
        return null;
    }
};

export const deleteVideoFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: "video"
        });
        return result;
    } catch (error) {
        console.log("❌ Cloudinary delete error: ", error);
        return null;

    }
}