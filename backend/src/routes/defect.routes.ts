import express from 'express'
import mongoose from 'mongoose';

import { DefectController } from '../controllers/defect.controller';
const defectRouter = express.Router();

defectRouter.route('/addDefect').post(
    (req, res) => new DefectController().addDefect(req, res)
)

defectRouter.route('/getDefects').get(
    (req, res) => new DefectController().getDefects(req, res)
)

defectRouter.route('/getDefect').post(
    (req, res) => new DefectController().getDefect(req, res)
)

defectRouter.route('/updateDefect').post(
    (req, res) => new DefectController().updateDefect(req, res)
)

defectRouter.route('/deleteDefect').post(
    (req, res) => new DefectController().deleteDefect(req, res)
)
defectRouter.route('/fixDefect').post(
    (req, res) => new DefectController().fixDefect(req, res)
)

export default defectRouter;