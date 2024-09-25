import express from 'express'
import PaymentModel from '../models/Payment';
const mongoose = require('mongoose');

export class PaymentsController {

    getPayments(req: express.Request, res: express.Response) {
        console.log("pozvano");
        PaymentModel.find().then((payment) => {
            console.log(payment);
            res.json(payment);
        })
    }

    addPayment(req: express.Request, res: express.Response) {
        const payment = req.body;
        let idUser = payment.idUser;
        let idVehicle = payment.idVehicle;
        let date = payment.date;
        let price = payment.price;
        let description = payment.description;
        let type = payment.type;

        const paymentM = new PaymentModel({
            _id: new mongoose.Types.ObjectId(),
            idUser: idUser,
            idVehicle: idVehicle,
            date: date,
            type: type,
            price: price,
            description: description
        });
        console.log(paymentM);
        paymentM.save().then((payment) => {
            res.json({ 'message': 'ok' });
        }).catch((error) => {
            //console.log(error);
            res.json({ 'message': 'error' });
        });
    }

}