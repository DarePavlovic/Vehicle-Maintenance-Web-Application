import express from 'express'
import mongoose from 'mongoose';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=> new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req,res)=> new UserController().register(req,res)
)

userRouter.route('/getUser').post(
    (req,res)=> new UserController().getUser(req,res)
)

userRouter.route('/getEmail').post(
    (req,res)=> new UserController().getEmail(req,res)
)

userRouter.route('/updateUser').post(
    (req,res)=> new UserController().updateUser(req,res)
)   
userRouter.route('/getAllUsers').get(
    (req,res)=> new UserController().getAllUsers(req,res)
)  
userRouter.route('/getAllMechanics').get(
    (req,res)=> new UserController().getAllMechanics(req,res)
)  

userRouter.route('/setVehicle').post(
    (req,res)=> new UserController().setVehicle(req,res)
)

userRouter.route('/getVehicle').post(
    (req,res)=> new UserController().getVehicle(req,res)
)

userRouter.route('/getPassword').post(
    (req,res)=> new UserController().getPassword(req,res)
)

userRouter.route('/changePassword').post(
    (req,res)=> new UserController().changePassword(req,res)
)

userRouter.route('/updateProfile').post(
    (req,res)=> new UserController().updateProfile(req,res)
)


export default userRouter;