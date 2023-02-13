import express from "express";
import {currentUser} from "../middlewares/current-user";
import {requireAuth} from "../middlewares/require-auth";
const router = express();

router.get('/currentuser', currentUser, requireAuth, (req, res) => {
    res.send({currenUser: req.currentUser || null});
});

export { router as currentUserRouter }
