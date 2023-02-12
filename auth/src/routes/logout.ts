import express from "express";
const router = express();

router.post('/logout', (req, res) => {
    req.session = null;
    console.log("req.session: ", req.session)
    res.send({});
});

export { router as logoutUserRouter }
