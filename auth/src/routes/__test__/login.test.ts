import request from 'supertest';
import {app} from "../../app";
import {register} from "./utility";

describe('Login', function () {
    it('should return a 201 on successful login', async () => {
        await register();
        await request(app)
            .post(`/api/user/login`)
            .send({
                email: "test@gmail.com",
                password: "password"
            })
            .expect(201);
    });

    it('fails when a email that does not exist is supplied', async () => {
        await request(app)
            .post('/api/user/login')
            .send({
                email: "test1@gmail.com",
                password: "password"
            })
            .expect(404);
    });

    it('should return a 400 with invalid email', async () => {
        request(app)
            .post('/api/user/login')
            .send({
                email: "test.com",
                password: "password"
            })
            .expect(400);
    });

    it('should return a 400 with invalid password', async () => {
        await register();
        return request(app)
            .post('/api/user/login')
            .send({
                email: "test@gmail.com",
                password: "sasdfsdfsdfsdfsd"
            })
            .expect(400);
    });

    it('should return a 400 with missing email or password', async () => {
        await request(app)
            .post('/api/user/login')
            .send({
                email: "test@gmail.com",
            })
            .expect(400);
        await request(app)
            .post('/api/user/login')
            .send({
                password: "password",
            })
            .expect(400);
    });

    it('sets a cookie after successful signup', async () => {
        await register();
        const response = await request(app)
            .post('/api/user/login')
            .send({
                email: "test@gmail.com",
                password: "password"
            })
            .expect(201);
        expect(response.get('Set-Cookie')).toBeDefined();
    });
})