import express from 'express';
import { json } from 'body-parser';
import {currentUserRouter} from "./routes/current-user";

const app = express();
app.use(json());

app.use('/api/users', currentUserRouter);

app.listen(3000, () => {
    console.info('Listening on port 3000...');
})

