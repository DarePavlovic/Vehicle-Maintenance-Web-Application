import express from 'express'
import PaymentModel from '../models/Payment';
const mongoose = require('mongoose');

export class PaymentsController{
    
    getPayments(req:express.Request, res:express.Response){
        console.log("pozvano");
        PaymentModel.find().then((payment)=>{
            console.log(payment);
            res.json(payment);
        })
    }
    
}