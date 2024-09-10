import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
let Vehicle = new Schema({
    _id:{
        type:ObjectId
    },
    model: {
        type: String
    },
    engine: {
        type: String
    },
    fuel: {
        type: String
    },
    yearMade: {
        type: Number
    },
    picture: {
        type: String
    },
    mileage: {
        type: Number
    },
    mileageMonth: {
        type: Number
    },
    mileageTillServis: {
        type: Number
    },
    fuelConsumptionMonth: {
        type: Number
    },
    consumptionMonth: {
        type: Number
    },
    consumptionGeneral: {
        type: Number
    },
    status: {
        type: Boolean
    },
    dateTire: {
        type: Date
    },
    dateRegistration: {
        type: Date
    },
    dateSmallServis: {
        type: Date
    },
    dateBigServis: {
        type: Date
    },
    dateFirstAid: {
        type: Date
    },
    priceFuelMonth: {
        type: Number
    },
    priceMaintenanceMonth: {
        type: Number
    },
    priceMainainanceGeneral: {
        type: Number
    },
    priceRegistration: {
        type: Number
    }, 
    vehicleValue : {
        type: Number
    },
    idUser: {
        type: ObjectId
    }
});
export default mongoose.model('VehicleModel', Vehicle, 'vehicles');