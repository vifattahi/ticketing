import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { json } from 'body-parser';
import {currentUserRouter} from "./routes/current-user";
import {loginUserRouter} from "./routes/login";
import {logoutUserRouter} from "./routes/logout";
import {registerUserRouter} from "./routes/register";
import {errorHandlers} from "./middlewares/error-handlers";
import {NotFoundError} from "./errors/notFoudError";

const app = express();
app.use(json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use('/api/user', currentUserRouter);
app.use('/api/user', loginUserRouter);
app.use('/api/user', logoutUserRouter);
app.use('/api/user', registerUserRouter);
app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandlers);

app.listen(3000, () => {
    console.info('Listening on port 3000...');
})

