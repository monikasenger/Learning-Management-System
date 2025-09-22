import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/connectCloudinary.js";  

const storage = new CloudinaryStorage({
  cloudinary,   // Cloudinary instance yahi pass karein
  params: {
    folder: "LMS",
    allowed_formats: ["jpg", "png", "pdf", "docx"],
    resource_type: "auto", // images, pdfs, videos
  },
});

const upload = multer({ storage });

export default upload;
