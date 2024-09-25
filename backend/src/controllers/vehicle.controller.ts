import express from 'express'
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import VehicleModel from '../models/Vehicle';
import { ObjectId } from 'mongodb';
const mongoose = require('mongoose');
export class VehicleController{

    addVehicle(req: express.Request, res: express.Response): void {

        let vehicle = new VehicleModel({
            _id: new mongoose.Types.ObjectId(),
            model: req.body.model,
            engine: req.body.engine,
            fuel: req.body.fuel,
            yearmade: req.body.yearMade,
            licensePlate: req.body.licensePlate,
            picture: req.body.picture,
            mileage: req.body.mileage,
            mileageMonth: req.body.mileageMonth,
            mileageTillServis: req.body.mileageTillServis,
            fuelConsumptionMonth: req.body.fuelConsumptionMonth,
            consumptionMonth: req.body.consumptionMonth,
            consumptionGeneral: req.body.consumptionGeneral,
            status: req.body.status,
            dateTire: req.body.dateTire,
            dateRegistration: req.body.dateRegistration,
            dateSmallServis: req.body.dateSmallServis,
            dateBigServis: req.body.dateBigServis,
            dateFirstAid: req.body.dateFirstAid,
            dateFireExtinguisher: req.body.dateFireExtinguisher,
            dateFuelFill: req.body.dateFuelFill,
            priceFuelMonth: req.body.priceFuelMonth,
            priceMainainanceMonth: req.body.priceMainainanceMonth,
            priceMainainanceGeneral: req.body.priceMainainanceGeneral,
            priceRegistration: req.body.priceRegistration,
            vehicleValue: req.body.vehicleValue,
            idUser: new ObjectId(req.body.idUser)
            //ownerUsername: req.body.ownerUsername
        })
        //save the user and if its error console log the error and send status 400 else send the message ok
        vehicle.save().then((_vehicle)=>{
            res.json({'message':'ok'});
        }).catch((error)=>{
            console.log(error);
            res.json({'message':'error'});
        });

    }


    setOwner(req: express.Request, res: express.Response): void {
        let idVehicle = new mongoose.Types.ObjectId(req.body.idVehicle);
        //let idUser = req.body.idUser;
        let idUser = new mongoose.Types.ObjectId(req.body.idUser);
        VehicleModel.findOneAndUpdate({'_id':idVehicle}, {'idUser':idUser, 'status':"active"}).then((vehicle)=>{
            res.json(vehicle);
        })
    }

    getVehicles(req: express.Request, res: express.Response): void {
        VehicleModel.find().then((vehicles)=>{
            res.json(vehicles);
        })
    }

    getVehicle(req: express.Request, res: express.Response): void {
        const idVehicle = req.body.idVehicle;
        let id = new mongoose.Types.ObjectId(idVehicle);
        VehicleModel.findOne({'_id':id}).then((vehicle)=>{
            res.json(vehicle);
        })
    }

    updateVehicle(req: express.Request, res: express.Response): void {
        let id = new mongoose.Types.ObjectId(req.body.idVehicle);
        let make = req.body.make;
        let model = req.body.model;
        let engine = req.body.engine;
        let fuel = req.body.fuel;
        let yearmade = req.body.yearMade;
        let licensePlate = req.body.licensePlate;
        let picture = req.body.picture;
        let mileage = req.body.mileage;
        let mileageMonth = req.body.mileageMonth;
        let mileageTillServis = req.body.mileageTillServis;
        let fuelConsumptionMonth = req.body.fuelConsumptionMonth;
        let consumptionMonth = req.body.consumptionMonth;
        let consumptionGeneral = req.body.consumptionGeneral;
        let status = req.body.status;
        let dateTire = req.body.dateTire;
        let dateRegistration = req.body.dateRegistration;
        let dateSmallServis = req.body.dateSmallServis;
        let dateBigServis = req.body.dateBigServis;
        let dateFirstAid = req.body.dateFirstAid;
        let dateFireExtinguisher = req.body.dateFireExtinguisher;
        let dateFuelFill = req.body.dateFuelFill;
        let priceFuelMonth = req.body.priceFuelMonth;
        let priceMainainanceMonth = req.body.priceMainainanceMonth;
        let priceMainainanceGeneral = req.body.priceMainainanceGeneral;
        let priceRegistration = req.body.priceRegistration;
        let vehicleValue = req.body.vehicleValue;
        //let idUser = req.body.idUser;
        //let ownerUsername = req.body.ownerUsername;
        VehicleModel.updateOne({'_id':id}, {$set:{'make':make, 'model':model, 'engine':engine,
        'fuel':fuel,'yearmade':yearmade,'licensePlate':licensePlate, 'picture':picture,'mileage':mileage,'mileageMonth':mileageMonth,
        'mileageTillServis':mileageTillServis,'fuelConsumptionMonth':fuelConsumptionMonth,'consumptionMonth':consumptionMonth,
        'consumptionGeneral':consumptionGeneral,'status':status,'dateTire':dateTire,'dateRegistration':dateRegistration,
        'dateSmallServis':dateSmallServis,'dateBigServis':dateBigServis,'dateFirstAid':dateFirstAid,'dateFireExtinguisher':dateFireExtinguisher,'dateFuelFill':dateFuelFill,
        'priceFuelMonth':priceFuelMonth,'priceMainainanceMonth':priceMainainanceMonth,'priceMainainanceGeneral':priceMainainanceGeneral,
        'priceRegistration':priceRegistration,'vehicleValue':vehicleValue}}).then((err)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }

    deleteVehicle(req: express.Request, res: express.Response): void {
        let id = new mongoose.Types.ObjectId(req.body.idVehicle);
        VehicleModel.deleteOne({'_id':id}).then((err)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }

    getVehicleByUser(req: express.Request, res: express.Response): void {
        let idUser = new mongoose.Types.ObjectId(req.body.idUser);
        //console.log(idUser);
        VehicleModel.findOne({'idUser':idUser}).then((vehicles)=>{
            if(vehicles)
                res.json(vehicles);
        })
    }

    
    fillFuel(req: express.Request, res: express.Response): void {
        let id = new mongoose.Types.ObjectId(req.body.id);
        let mileage = req.body.mileage;
        let mileageMonth = req.body.mileageMonth;
        let mileageTillServis = req.body.mileageTillServis;
        let fuelConsumptionMonth = req.body.fuelConsumptionMonth;
        let consumptionMonth = req.body.consumptionMonth;
        let consumptionGeneral = req.body.consumptionGeneral;
        let dateFuelFill = req.body.dateFuelFill;
        let priceFuelMonth = req.body.priceFuelMonth;
        VehicleModel.updateOne({'_id':id}, {$set:{'mileage':mileage,'mileageMonth':mileageMonth,
        'mileageTillServis':mileageTillServis,'fuelConsumptionMonth':fuelConsumptionMonth,'consumptionMonth':consumptionMonth,
        'consumptionGeneral':consumptionGeneral,'dateFuelFill':dateFuelFill,
        'priceFuelMonth':priceFuelMonth}}).then((err)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }

}