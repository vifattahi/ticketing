import request from 'supertest';
import {app} from "../../app";
import {register} from "./utility";

describe('Logout', function () {
    it('clears the cookie after logout', async () => {
        await register();
        const response = await request(app)
            .post(`/api/user/logout`)
            .send({})
            .expect(200);
        expect(response.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly' )
    });
})