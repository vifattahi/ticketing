import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { json } from 'body-parser';
import * as mongoose from "mongoose";
import cookieSession from "cookie-session";
import {currentUserRouter} from "./routes/current-user";
import {loginUserRouter} from "./routes/login";
import {logoutUserRouter} from "./routes/logout";
import {registerUserRouter} from "./routes/register";
import {errorHandlers} from "./middlewares/error-handlers";
import {NotFoundError} from "./errors/notFoudError";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(morgan('dev'));
app.use(cookieSession({
    signed: false,
    secure: true
}));
app.use('/api/user', currentUserRouter);
app.use('/api/user', loginUserRouter);
app.use('/api/user', logoutUserRouter);
app.use('/api/user', registerUserRouter);
app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandlers);

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('database was connected.')
    }catch (e) {
        console.log(e)
    }
    app.listen(3000, () => {
        console.info('Listening on port 3000...');
    })
}
start();

