const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    }
})

const Files = new mongoose.model("Files", userSchema);
module.exports = {Files};