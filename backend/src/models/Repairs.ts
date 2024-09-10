import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
let Repairs = new Schema({
    idUser: {
        type: ObjectId
    }, 
    idVehicle: {
        type: ObjectId
    },
    idDefect: {
        type: ObjectId
    },
    date: {
        type: Date
    }
});
export default mongoose.model('RepairsModel', Repairs, 'Repairs');