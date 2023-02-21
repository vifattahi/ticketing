import 'express-async-errors';
import * as mongoose from "mongoose";
import {app} from "./app";

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        mongoose.set('strictQuery', false);
        console.log('database was connected.')
    }catch (e) {
        console.log(e)
    }
    app.listen(4000, () => {
        console.info('Listening on port 4000...');
    })
}
start();