import express, {Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {User} from "../models/user";
import jwt from "jsonwebtoken";
import {NotFoundError} from "../errors/notFoudError";
import {PasswordService} from "../services/auth/password.service";
import {validateRequest} from "../middlewares/validate-request";
import {BadRequestError} from "../errors/badRequestError";
const router = express();

router.post('/login',
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
        const user = await User.findOne({ email });
        if(!user) {
            throw new NotFoundError();
        }
        if(!await PasswordService.compare(user.password, password)) {
            throw new BadRequestError();
        }
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

export { router as loginUserRouter }
