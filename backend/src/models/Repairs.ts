import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
let Repairs = new Schema({
    _id: {
        type: Object, default: new mongoose.Types.ObjectId()
    },
    idUser: {
        type: ObjectId
    }, 
    idVehicle: {
        type: ObjectId
    },
    idDefect: {
        type: Array<ObjectId>
    },
    date: {
        type: Date
    },
    price: {
        type: Number
    },
    description: {
        type: String
    }
});
const RepairsModel = mongoose.model('RepairsModel', Repairs, 'Repairs');
export default RepairsModel;