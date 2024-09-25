import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
let PendingPayment = new Schema({
    _id: {
        type: Object, default: new mongoose.Types.ObjectId()
    },
    idUser: {
        type: Object, default: new mongoose.Types.ObjectId()
    },
    idVehicle: {
        type: Object, default: new mongoose.Types.ObjectId()
    },
    date: {
        type: Date
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    type: {
        type: String
    }
});

const PendingPaymentModel = mongoose.model('PendingPaymentModel', PendingPayment, 'PendingPayments');
export default PendingPaymentModel;
