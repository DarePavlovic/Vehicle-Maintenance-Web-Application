//import express from 'express';
//import cors from 'cors'
//import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes'
import vehicleRouter from './routes/vehicle.routes';
import defectRouter from './routes/defect.routes';
import repairRouter from './routes/repairs.routes';
import paymentsRouter from './routes/payments.routes';
import UserModel from './models/User';
import PaymentModel from './models/Payment';
const cors = require('cors');
const cron = require('node-cron');
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
router.use('/Payments', paymentsRouter);
router.use('/vehicles', vehicleRouter);
router.use('/Defect', defectRouter);
router.use('/Repairs', repairRouter);
app.use('/', router);

function getPreviousMonthYear() {
    const currentDate = new Date();
    let previousMonth = currentDate.getMonth();
    let year = currentDate.getFullYear();

    if (previousMonth === 0) {
        previousMonth = 12;
        year -= 1;
    }

    return { previousMonth, year };
}

async function give_salary() {
    const { previousMonth, year } = getPreviousMonthYear();
    try {
        const employees = await UserModel.find({
        $or: [
            { type: 'admin' },
            { type: 'driver' }
        ]
        });

        for (const employee of employees) {
            const newPayment = new PaymentModel({
                _id: new mongoose.Types.ObjectId(),
                idUser: employee._id,
                idVehicle: null,
                price: (employee.salary * employee.coefficient),
                date: new Date(),
                description: "Plata za " + previousMonth + ". mesec " + year + ". godine",
                type: 'plata'
            });
            await newPayment.save();
        }
        console.log("Plata za " + previousMonth + " mesec " + year + "godine je pustena");
    } catch (error) {
        console.error("Plata za " + previousMonth + " mesec " + year + "godine ima problem pri pustanju", error);
    }
}

// cron.schedule('0 0 1 * *', () => {
//     give_salary();
// });

cron.schedule('20 19 * * *', () => {
    give_salary();
});


app.listen(4000, () => console.log(`Express server running on port 4000`));