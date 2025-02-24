const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cloudinary = require('../utils/cloudinary');
const { Files } = require('../models/userSchema');

// Ensure upload folder exists
const uploadDir = path.join(__dirname, '../upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        callback(null, `Image-${Date.now()}.${file.originalname}`);
    }
});

// Image filter
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("Only Images are Allowed"), false);
    }
};

const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
});

// 🛠️ File Upload Route
router.post('/login', upload.single("photo"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Please upload an image" });
        }

        const filePath = req.file.path; // Local file path
        const upload = await cloudinary.uploader.upload(filePath, {
            folder: "samples" // Cloudinary folder
        });

        // ✅ Local File Delete After Upload
        fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting local file:", err);
        });

        const { name } = req.body;
        const userData = new Files({
            name: name,
            img: upload.secure_url
        });

        await userData.save();

        res.status(200).json({
            success: true,
            message: "User added successfully",
            data: userData
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;