const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const DB_Connect = require('./src/config/database');
const router = require('./src/routes/router')

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.use('/api', router);

DB_Connect()
        .then(()=>{
            app.listen(PORT, ()=>{
                console.log(`App is Listening at the PORT ${PORT}`)
            })
        })
        .catch((err)=>{
            console.error("DataBase Not Connected", err)
        })