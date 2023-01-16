"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const { BlobServiceClient } = require('@azure/storage-blob');
// const RemoToken = require('./controllers/token')
// const graph = require('./routes/graph')
// var azure = require('azure-storage');
const morgan_1 = __importDefault(require("morgan"));
// const axios = require('axios')
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const SERVER_PORT = 80;
require('dotenv').config();
// Create Express App and Routes
const app = (0, express_1.default)();
// app.use(express.json());
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// app.use(express.urlencoded({limit: '25mb', extended: true}));
// app.use(bodyParser.json({ limit: "50mb" }))
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.get('/user', (req, res) => {
    res.send("Get data");
});
console.log("Remo");
app.listen(SERVER_PORT, () => console.log(`Msal Node Auth Code Sample app listening on port ${SERVER_PORT}!`));
