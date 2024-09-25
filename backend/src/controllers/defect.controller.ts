import express from 'express'
import DefectModel from '../models/Defect';
const mongoose = require('mongoose');

export class DefectController{
    
    addDefect(req:express.Request, res:express.Response){
        let defect = new DefectModel({
            _id: new mongoose.Types.ObjectId(),
            // idRepair: new mongoose.Types.ObjectId(req.body.idRepair),
            description: req.body.description,
            pictureBefore: req.body.pictureBefore,
            pictureAfter: req.body.pictureAfter,
            priceParts: req.body.priceParts,
            mechanicFee: req.body.mechanicFee,
            totalPrice: req.body.totalPrice
        })
        defect.save().then((_defect)=>{
            res.json({_id: _defect._id});
        }).catch((error)=>{
            console.log(error);
            res.json({'message':'error'});
        })
    }

    getDefects(req:express.Request, res:express.Response){
        DefectModel.find().then((defects)=>{
            res.json(defects);
        })
    }

    getDefect(req:express.Request, res:express.Response){
        let idDefect = new mongoose.Types.ObjectId(req.body.idDefect);
        DefectModel.findOne({'_id':idDefect}).then((defect)=>{
            res.json(defect);
        })
    }

    updateDefect(req:express.Request, res:express.Response){
        let idDefect = new mongoose.Types.ObjectId(req.body.idDefect);
        let description = req.body.description;
        let pictureBefore = req.body.pictureBefore;
        let pictureAfter = req.body.pictureAfter;
        let priceParts = req.body.priceParts;
        let mechanicFee = req.body.mechanicFee;
        let totalPrice = req.body.totalPrice;

        DefectModel.findOneAndUpdate({'_id':idDefect}, {'description':description, 'pictureBefore':pictureBefore, 'pictureAfter':pictureAfter, 'priceParts':priceParts, 'mechanicFee':mechanicFee, 'totalPrice':totalPrice}).then((defect)=>{
            res.json(defect);
        })
    }

    deleteDefect(req:express.Request, res:express.Response){
        let idDefect = new mongoose.Types.ObjectId(req.body.idDefect);
        DefectModel.deleteOne({'_id':idDefect}).then((defect)=>{
            res.json(defect);
        })
    }

    fixDefect(req:express.Request, res:express.Response){
        let idDefect = new mongoose.Types.ObjectId(req.body.idDefect);
        let pictureAfter = req.body.pictureAfter;
        let priceParts = req.body.priceParts;
        let mechanicFee = req.body.mechanicFee;
        let totalPrice = req.body.totalPrice;

        DefectModel.findOneAndUpdate({'_id':idDefect}, {'pictureAfter':pictureAfter, 'priceParts':priceParts, 'mechanicFee':mechanicFee, 'totalPrice':totalPrice}).then((defect)=>{
            res.json(defect);
        })
    }
}