import express from 'express';
import { json } from 'body-parser';
import {currentUserRouter} from "./routes/current-user";
import {loginUserRouter} from "./routes/login";
import {logoutUserRouter} from "./routes/logout";
import {registertUserRouter} from "./routes/register";

const app = express();
app.use(json());

app.use('/api/users', currentUserRouter);
app.use('/api/users', loginUserRouter);
app.use('/api/users', logoutUserRouter);
app.use('/api/users', registertUserRouter);

app.listen(3000, () => {
    console.info('Listening on port 3000...');
})

