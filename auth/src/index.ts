import express from 'express';
import { json } from 'body-parser';
import {currentUserRouter} from "./routes/current-user";
import {loginUserRouter} from "./routes/login";
import {logoutUserRouter} from "./routes/logout";
import {registerUserRouter} from "./routes/register";

const app = express();
app.use(json());

app.use('/api/user', currentUserRouter);
app.use('/api/user', loginUserRouter);
app.use('/api/user', logoutUserRouter);
app.use('/api/user', registerUserRouter);

app.listen(3000, () => {
    console.info('Listening on port 3000...!');
})

