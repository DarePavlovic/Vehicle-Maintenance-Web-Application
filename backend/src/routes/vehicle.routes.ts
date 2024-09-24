import express from 'express'
import mongoose from 'mongoose';
import { VehicleController } from '../controllers/vehicle.controller';

const vehicleRouter = express.Router();

vehicleRouter.route('/addVehicle').post(
    (req, res)=> new VehicleController().addVehicle(req, res)
)


vehicleRouter.route('/setOwner').post(
    (req,res)=> new VehicleController().setOwner(req,res)
)

vehicleRouter.route('/getVehicles').get(
    (req,res)=> new VehicleController().getVehicles(req,res)
)

vehicleRouter.route('/getVehicleLicense').post(
    (req,res)=> new VehicleController().getVehicle(req,res)
)

vehicleRouter.route('/updateVehicle').post(
    (req,res)=> new VehicleController().updateVehicle(req,res)
)

vehicleRouter.route('/deleteVehicle').post(
    (req,res)=> new VehicleController().deleteVehicle(req,res)
)

vehicleRouter.route('/getVehicleByUser').post(
    (req,res)=> new VehicleController().getVehicleByUser(req,res)
)


export default vehicleRouter;