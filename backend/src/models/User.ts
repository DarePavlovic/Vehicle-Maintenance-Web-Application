import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    picture: {
        type: String
    },
    type: {
        type: String
    },
    coefficient: {
        type: Number
    },
    salary: {
        type: Number
    },
    idVehicle: {
        type: Array<ObjectId>
    }
});
const UserModel = mongoose.model('UserModel', User, 'User');
export default UserModel;