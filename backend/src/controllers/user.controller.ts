import express from 'express'
import UserModel from '../models/User';

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
            firstname:req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            email : req.body.email,
            picture: req.body.picture,
            //'picture' : typeof req.body.picture !== 'undefined' ? req.body.picture : 'profile_default.jpg',
            type: req.body.type,
            coefficient: req.body.coefficient,
            salary: req.body.salary,
            idVehicle: req.body.idVehicle
            
        })
        //save the user and if its error console log the error and send status 400 else send the message ok
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


}