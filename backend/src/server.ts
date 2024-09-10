import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes'

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/vehicleMaintenance');
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('db connected');
})

const router = express.Router();
router.use('/User', userRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));