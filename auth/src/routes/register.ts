import express, { Request, Response } from "express";
import {body, validationResult} from "express-validator";
import {RequestValidationError} from "../errors/request-validation-error";

import {User} from "../models/user";
import {AlreadyExistsError} from "../errors/already-exists-error";

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
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const {email, password} = req.body;
        const existUser = await User.findOne({ email });
        if(existUser) {
           throw new AlreadyExistsError();
        }
        const user = await User.build({ email, password });
        await user.save();
        res.status(201).send(user);
    });

export { router as registerUserRouter }
