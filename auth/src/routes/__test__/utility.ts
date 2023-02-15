import request from "supertest";
import {app} from "../../app";
async function register() {
    await request(app)
        .post(`/api/user/register`)
        .send({
            email: "test@gmail.com",
            password: "password"
        })
}
export { register };