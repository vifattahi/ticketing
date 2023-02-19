import request from "supertest";
import {app} from "../../app";
async function register() {
    const response = await request(app)
        .post(`/api/user/register`)
        .send({
            email: "test@gmail.com",
            password: "password"
        });
    return response.get('Set-Cookie');

}
export { register };