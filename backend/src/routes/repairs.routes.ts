import express from 'express'
import mongoose from 'mongoose';

import { RepairsController } from '../controllers/repairs.controller';
const repairRouter = express.Router();

repairRouter.route('/addRepair').post(
    (req, res) => new RepairsController().addRepair(req, res)
)

repairRouter.route('/setMechanic').post(
    (req, res) => new RepairsController().setMechanic(req, res)
)

repairRouter.route('/getRepairs').get(
    (req, res) => new RepairsController().getRepairs(req, res)
)

repairRouter.route('/getRepair').post(
    (req, res) => new RepairsController().getRepair(req, res)
)

repairRouter.route('/updateRepair').post(
    (req, res) => new RepairsController().updateRepair(req, res)
)

repairRouter.route('/deleteRepair').post(
    (req, res) => new RepairsController().deleteRepair(req, res)
)

repairRouter.route('/getRepairsByVehicle').post(
    (req, res) => new RepairsController().getRepairsByVehicle(req, res)
)

repairRouter.route('/setPrice').post(
    (req, res) => new RepairsController().setPrice(req, res)
)

repairRouter.route('/setDefects').post(
    (req, res) => new RepairsController().setDefects(req, res)
)

repairRouter.route('/createRepairWithDefects').post(
    (req, res) => new RepairsController().createRepairWithDefects(req, res)
)

export default repairRouter;