const cloudinary = require("cloudinary");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "project-images",
        allowedFormats: ["jpeg", "jpg", "png"],
        transformation: [{width: 500, height: 500, crop: "limit"}],
    },
});

module.exports = {
    cloudinary,
    storage,
};
