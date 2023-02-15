import request from 'supertest';
import {app} from "../../app";

describe('Register', function () {
    it('should return a 201 on successful register', async () => {
        return request(app)
            .post(`/api/user/register`)
            .send({
                email: "test@gmail.com",
                password: "password"
            })
            .expect(201);
    });
    it('should return a 400 with invalid email', async () => {
        request(app)
            .post('/api/user/register')
            .send({
                email: "test.com",
                password: "password"
            })
            .expect(400);
    });
    it('should return a 400 with invalid password', async () => {
        return request(app)
            .post('/api/user/register')
            .send({
                email: "test@gmail.com",
                password: "s"
            })
            .expect(400);
    });
    it('should return a 400 with missing email or password', async () => {
        await request(app)
            .post('/api/user/register')
            .send({
                email: "test@gmail.com",
            })
            .expect(400);
        await request(app)
            .post('/api/user/register')
            .send({
                password: "password",
            })
            .expect(400);
    });
    it('disallows duplicate emails', async () => {
        await request(app)
            .post('/api/user/register')
            .send({
                email: "test@gmail.com",
                password: "password"
            })
            .expect(201);
        await request(app)
            .post('/api/user/register')
            .send({
                email: "test@gmail.com",
                password: "password"
            })
            .expect(409);
    });

    it('sets a cookie after successful signup', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({
                email: "test@gmail.com",
                password: "password"
            })
            .expect(201);
        expect(response.get('Set-Cookie')).toBeDefined();
    });
})