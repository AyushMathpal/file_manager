import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: "dndqw2i5z",
  api_key: "229891745613517",
  api_secret: "Aw78L2ruVHcoU1vh8dAZzly37bE",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error()
  }
};

export { uploadOnCloudinary,deleteFromCloudinary };
