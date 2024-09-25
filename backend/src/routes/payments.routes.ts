import express from 'express'
import mongoose from 'mongoose';
import { PaymentsController } from '../controllers/payments.controller';

const paymentsRouter = express.Router();

paymentsRouter.route('/getPayments').get(
    (req, res) => new PaymentsController().getPayments(req, res)
)

export default paymentsRouter;