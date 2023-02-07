import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from 'jsonwebtoken';

import { User } from "../models/user";
import { AlreadyExistsError } from "../errors/already-exists-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express();

router.post('/register',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid!'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {email, password} = req.body;
        const existUser = await User.findOne({ email });
        if(existUser) {
           throw new AlreadyExistsError();
        }
        const user = await User.build({ email, password });
        await user.save();
        const userJWT = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!
        );
        req.session = {
            jwt: userJWT
        };
        res.status(201).send(user);
    });

export { router as registerUserRouter }
