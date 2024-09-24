import express from 'express'
import UserModel from '../models/User';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { ObjectId } from 'mongodb';
//import mongoose from 'mongoose';
const mongoose = require('mongoose');
export class UserController{
    

    login = (req:express.Request, res:express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username':username, 'password':password}).then((user)=>{
            if(user){
                res.json(user);
            }
            else{
                res.json({'message':'error'});
            }
        } ) 
    }

    register = (req:express.Request, res:express.Response)=>{
        
        let user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            firstname:req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            email : req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            picture: req.body.picture,
            type: req.body.type,
            coefficient: req.body.coefficient,
            salary: req.body.salary,
            idVehicle: new ObjectId(req.body.idVehicle)
        })
        user.save().then((_user)=>{
            res.json({'message':'ok'});
        }).catch((error)=>{
            console.log(error);
            res.json({'message':'error'});
        })
    }

    getUser = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        UserModel.findOne({'username':username}).then((user)=>{
            res.json(user);
        })
    }

    getEmail = (req:express.Request, res:express.Response)=>{
        
        let username = req.body.username;
        let email = req.body.email;

        UserModel.findOne({'username':username,'email':email}).then((user)=>{
            res.json(user);
        }).catch((error)=>{
            console.log(error);
            res.json({'message':'error'});
        })
    }

    updateUser = (req:express.Request, res:express.Response)=>{
        let id = new mongoose.Types.ObjectId(req.body._id);
        let firstname=req.body.firstname;
        let lastname= req.body.lastname;
        let username= req.body.username;
        let phone_number = req.body.phone_number;
        let address = req.body.address;
        let picture =  req.body.picture;
        let type=req.body.type;
        let coefficient=req.body.coefficient;
        let salary=req.body.salary;

        UserModel.updateOne({'_id':id}, {$set:{'firstname':firstname, 'lastname':lastname, 'address':address,
    'phone':phone_number,'picture':picture, 'type':type,'coefficient':coefficient, 'salary':salary}}).then((err)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }

    //make me function to get all users from the database and send them to the frontend if error console log the error
    getAllUsers = (req:express.Request, res:express.Response)=>{
        UserModel.find().then((users)=>{
            res.json(users);
        }).catch((error)=>{
            console.log(error);
            res.status(500).json({'message':'error'});
        })
    }



    setVehicle = (req:express.Request, res:express.Response)=>{
        let idVehicle = new mongoose.Types.ObjectId(req.body.idVehicle);
        let idUser = new mongoose.Types.ObjectId(req.body.idUser);
        
        UserModel.updateOne({'_id':idUser}, {$set:{'idVehicle':idVehicle}}).then((err)=>{
            if(err) console.log(err);
            else{
                res.json({'message':'ok'})
            }
        })
    }
        
    getVehicle = (req:express.Request, res:express.Response)=>{ 
        let idUser = new mongoose.Types.ObjectId(req.body.idUser);
        UserModel.findOne({'_id':idUser}).then((user)=>{
            if(user)
                res.json(user.idVehicle);
        })
    }

}