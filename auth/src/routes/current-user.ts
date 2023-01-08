import express from "express";
const router = express();

router.get('/currentuser', (req, res) => {
    res.send('Hi There');
});

export { router as currentUserRouter }
