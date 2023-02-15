import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, {ConnectOptions} from "mongoose";
let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdoc';
    mongo = await MongoMemoryServer.create();
    const uri = await mongo.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions);
}, 70000)

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
})
afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})