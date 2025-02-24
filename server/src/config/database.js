const mongoose = require('mongoose')

const DB_Connect = async ()=> {
    try{
        await mongoose.connect(process.env.DB_Connect);
        console.log("Database Connected Successfully...")
    }
    catch(err){
        console.log("Database Not Connected Successfully...")
    }
}

module.exports = DB_Connect;