import express from 'express'
import mongoose from 'mongoose';
import { PendingPaymentsController } from '../controllers/pending.controller';


const pendingPaymentsRouter = express.Router();

pendingPaymentsRouter.route('/getPendingPayments').get(
    (req, res) => new PendingPaymentsController().getPendingPayments(req, res)
)

pendingPaymentsRouter.route('/addPendingPayment').post(
    (req, res)=> new PendingPaymentsController().addPendingPayment(req, res)
)

export default pendingPaymentsRouter;