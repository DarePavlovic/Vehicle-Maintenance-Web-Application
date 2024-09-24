import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
let Defect = new Schema({
    _id: {
        type: Object, default: new mongoose.Types.ObjectId()
    },
    // idRepair: {
    //     type: Object, default: new mongoose.Types.ObjectId()
    // },
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

const DefectModel = mongoose.model('DefectModel', Defect, 'Defect');
export default DefectModel;