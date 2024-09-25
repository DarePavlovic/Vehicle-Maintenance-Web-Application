import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
let Payment = new Schema({
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

const PaymentModel = mongoose.model('PaymentModel', Payment, 'Payments');
export default PaymentModel;
