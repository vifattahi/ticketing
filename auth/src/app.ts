import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { json } from 'body-parser';
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
    secure: process.env.NODE_ENV !== 'test'
}));
app.use('/api/user', currentUserRouter);
app.use('/api/user', loginUserRouter);
app.use('/api/user', logoutUserRouter);
app.use('/api/user', registerUserRouter);
app.all('*', async () => {
    throw new NotFoundError();
})
app.use(errorHandlers);

export { app };
