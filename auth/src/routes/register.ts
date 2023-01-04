import express from "express";
const router = express();

router.post('register', (req, res) => {
    res.send('Hi There');
});

export { router as registertUserRouter }
