import { connect } from 'mongoose';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/fisiocare';

async function connectDB() {
    try {
        const respDB = await connect(mongoUrl);
        console.log('Base de datos conectada');
        return respDB;
    } catch (error) {
        console.log(error);
    }
}

export { connectDB };