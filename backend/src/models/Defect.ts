import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
let Defect = new Schema({
    _id:{
        type:ObjectId
    },
    description: {
        type: String
    },
    pictureBefore: {
        type: String
    },
    pictureAfter: {
        type: String
    },
    priceParts: {
        type: Number
    },
    mechanicFee: {
        type: Number
    },
    totalPrice: {
        type: Number
    }
});
export default mongoose.model('DefectModel', Defect, 'Defect');