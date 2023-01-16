import express from "express";
// const { BlobServiceClient } = require('@azure/storage-blob');

// const RemoToken = require('./controllers/token')
// const graph = require('./routes/graph')
// var azure = require('azure-storage');
import logger from 'morgan';
// const axios = require('axios')
import cors from 'cors';
import  mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { json } from "body-parser";
const SERVER_PORT = 80 ;
import multer from "multer";
require('dotenv').config();


// Create Express App and Routes
const app = express();
// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
// app.use(express.urlencoded({limit: '25mb', extended: true}));
// app.use(bodyParser.json({ limit: "50mb" }))
app.use(cors());
app.use(logger('tiny'));





app.get('/user', (req:any, res:any) => {
     res.send("Get data")
});





console.log("Remo")



app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`))