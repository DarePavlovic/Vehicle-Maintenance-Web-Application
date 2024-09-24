//import express from 'express';
//import cors from 'cors'
//import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes'
import vehicleRouter from './routes/vehicle.routes';
import defectRouter from './routes/defect.routes';
import repairRouter from './routes/repairs.routes';
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/vehicleMaintenance');
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('db connected');
})

const router = express.Router();
router.use('/User', userRouter);
router.use('/vehicles', vehicleRouter);
router.use('/Defect', defectRouter);
router.use('/Repairs', repairRouter);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));