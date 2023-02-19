import {app} from "../../app";
import request from "supertest";
import {register} from "./utility";
describe('Current User', function () {
    it('responds with details about the current user', async () => {
        const cookie = await register();
        const response = await request(app)
            .get('/api/user/currentuser')
            .set('Cookie', cookie)
            .send()
            .expect(200);
        expect(response.body.currentUser.email).toEqual('test@gmail.com');
    });

    it('responds with null if not authenticated', async () => {

        const response = await request(app)
            .get('/api/user/currentuser')
            .send()
            .expect(401);
    });
})