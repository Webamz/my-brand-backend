import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//uploading image to cloudinary
export const uploadImageToCloudinary = async (file: Express.Multer.File) => {
  try {
    const image = await cloudinary.uploader.upload(file.path);
    return image.secure_url;
  } catch (error) {
    console.error("Error uploading image to cloudinary", error);
    throw error;
  }
};
