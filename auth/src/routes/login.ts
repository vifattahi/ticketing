import express from "express";
const router = express();

router.post('login', (req, res) => {
    res.send('Hi There');
});

export { router as loginUserRouter }
