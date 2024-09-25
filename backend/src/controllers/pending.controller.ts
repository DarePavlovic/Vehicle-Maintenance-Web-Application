import express from 'express'
import PendingPaymentModel from '../models/Pending';
const mongoose = require('mongoose');

export class PendingPaymentsController{
    
    getPendingPayments(req:express.Request, res:express.Response){
        PendingPaymentModel.find().then((payment)=>{
            console.log(payment);
            res.json(payment);
        })
    }

    
    addPendingPayment(req: express.Request, res: express.Response): void {

        let pendingPayment = new PendingPaymentModel({
            _id: new mongoose.Types.ObjectId(),
            idVehicle: new mongoose.Types.ObjectId(req.body.idVehicle),
            date: req.body.date,
            price: req.body.price,
            description: req.body.description,
            type: req.body.type,
            idUser: new mongoose.Types.ObjectId(req.body.idUser)
        })
        //save the user and if its error console log the error and send status 400 else send the message ok
        pendingPayment.save().then((_pendingPayment) => {
            res.json({ 'message': 'ok' });
        }).catch((error) => {
            console.log(error);
            res.json({ 'message': 'error' });
        });

    }

    
}