const express = require('express');
const mongoose = require('mongoose');
const app = express();
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const bodyParser = require('body-parser');
const multer = require('multer')
const data = multer()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting DataBase And Starting Server

const connectDb = async(req,res) =>{
    try{
        
       await mongoose.connect(dbConfig.URI);
       console.log('mongodb is connected');
       app.listen(serverConfig.PORT ,() => {
        console.log(`Application started on the port num : ${serverConfig.PORT}`);
    })
   
    }catch(err){
  
        console.log('Error inside db connection',err);

    }
  }
  
 connectDb();

 app.use(data.any());
 
 require('./routes/user.route')(app);