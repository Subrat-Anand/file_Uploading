const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dznl3umpi",
    api_key: "989147938189125",
    api_secret: "JiK-5NXyrZzJadljduU0H25JgTY"
})

module.exports = cloudinary;