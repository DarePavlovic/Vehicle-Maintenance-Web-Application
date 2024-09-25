import express from 'express'
const mongoose = require('mongoose');
//import { ObjectId } from 'mongoose';
import RepairsModel from '../models/Repairs';
import DefectModel from '../models/Defect';
//import mongoose from 'mongoose';

export class RepairsController {

    addRepair(req: express.Request, res: express.Response): void {
        const data = req.body.data;
        const defects = req.body.defects;
        console.log(req.body);
        if (Array.isArray(req.body.defects) && req.body.defects.every((item: any) => typeof item === 'string')) {
            console.log('idDefect is an array of strings:', req.body.defects);
        } else {
            console.error('idDefect is not an array of strings:', req.body.defects);
        }
        let u_id = data.idUser;
        if (u_id == '') {
            u_id = null;
        }
        else {
            u_id = new mongoose.Types.ObjectId(data.idUser);
        }
        const repair = new RepairsModel({
            _id: new mongoose.Types.ObjectId(),
            idUser: u_id,
            idVehicle: new mongoose.Types.ObjectId(data.idVehicle),
            idDefect: defects.map((id: string) => new mongoose.Types.ObjectId(id)),
            date: data.date,
            price: data.price,
            description: data.description
        })
        repair.save().then((_repair) => {
            if (_repair) {
                res.json({ _id: _repair._id });
            }
            else {
                res.json({ 'message': 'error' });
            }

        }).catch((error) => {
            console.log(error);
            res.json({ 'message': 'error' });
        });
    }

    setMechanic(req: express.Request, res: express.Response): void {
        let idRepair = new mongoose.Types.ObjectId(req.body.idRepair);
        let idMechanic = new mongoose.Types.ObjectId(req.body.idUser);
        RepairsModel.findOneAndUpdate({ '_id': idRepair }, { 'idUser': idMechanic }).then((repair) => {
            res.json(repair);
        })
    }
    getRepairs(req: express.Request, res: express.Response): void {
        RepairsModel.find().then((repairs) => {
            res.json(repairs);
        })
    }

    getRepair(req: express.Request, res: express.Response): void {
        let idRepair = new mongoose.Types.ObjectId(req.body.idRepair);
        RepairsModel.findOne({ '_id': idRepair }).then((repair) => {
            res.json(repair);
        })
    }

    updateRepair(req: express.Request, res: express.Response): void {
        let idRepair = new mongoose.Types.ObjectId(req.body.idRepair);
        RepairsModel.findOneAndUpdate({ '_id': idRepair }, { 'date': req.body.date, 'price': req.body.price, 'description': req.body.description }).then((repair) => {
            res.json(repair);
        })
    }

    deleteRepair(req: express.Request, res: express.Response): void {
        let idRepair = new mongoose.Types.ObjectId(req.body.idRepair);
        RepairsModel.deleteOne({ '_id': idRepair }).then(() => {
            res.json({ 'message': 'ok' });
        })
    }

    getRepairsByVehicle(req: express.Request, res: express.Response): void {
        let idVehicle = new mongoose.Types.ObjectId(req.body.idVehicle);
        RepairsModel.find({ 'idVehicle': idVehicle }).then((repairs) => {
            res.json(repairs);
        })

    }
    getRepairsByMechanic(req: express.Request, res: express.Response): void {
        let idUser = new mongoose.Types.ObjectId(req.body.idUser);
        RepairsModel.find({ 'idUser': idUser }).then((repairs) => {
            res.json(repairs);
        })
    }

    setPrice(req: express.Request, res: express.Response): void {
        let idRepair = new mongoose.Types.ObjectId(req.body.idRepair);
        let price = req.body.price;
        RepairsModel.findOneAndUpdate({ '_id': idRepair }, { 'price': price }).then((repair) => {
            res.json(repair);
        })
    }

    setDefects(req: express.Request, res: express.Response): void {
        let data = req.body;
        console.log(data.idDefect);
        console.log(data.idRepair);
        let idRepair = new mongoose.Types.ObjectId(data.idRepair);
        let idDefect = data.idDefect.map((id: string) => new mongoose.Types.ObjectId(id));
        RepairsModel.findOneAndUpdate({ '_id': idRepair }, { 'idDefect': idDefect }).then((repair) => {
            res.json(repair);
        })
    }

    getRepairsByDescription(req: express.Request, res: express.Response): void {
        let description = req.body.description;
        RepairsModel.find({ 'description': description }).then((repairs) => {
            res.json(repairs);
        })
    }

    async createRepairWithDefects(req: express.Request, res: express.Response): Promise<void> {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const idVehicle = new mongoose.Types.ObjectId(req.body.idVehicle);
            const defects = req.body.defects; // Assuming defects is an array of defect objects

            // Create Defect objects and save them
            const defectIds = [];
            for (const defectData of defects) {
                const defect = new DefectModel({
                    _id: new mongoose.Types.ObjectId(),
                    description: defectData.description,
                    pictureBefore: defectData.pictureBefore,
                    pictureAfter: defectData.pictureAfter,
                    priceParts: defectData.priceParts,
                    mechanicFee: defectData.mechanicFee,
                    totalPrice: defectData.totalPrice
                });
                const savedDefect = await defect.save({ session });
                defectIds.push(savedDefect._id);
            }

            // Create new Repair with defect IDs
            const newRepair = new RepairsModel({
                _id: new mongoose.Types.ObjectId(),
                idVehicle: idVehicle,
                idDefect: defectIds,
                date: req.body.date,
                // Add other fields as needed
            });

            await newRepair.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.status(201).json(newRepair);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}