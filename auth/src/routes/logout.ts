import express from "express";
const router = express();

router.get('/logout', (req, res) => {
    res.send('Hi There');
});

export { router as logoutUserRouter }
