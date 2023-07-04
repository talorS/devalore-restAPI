import { ConnectionOptionsExtend } from "@types";
import { connect, connection } from "mongoose"
import { env } from "process";

const options: ConnectionOptionsExtend = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connect to mongoDB through mongoose
const connectDB = async () => {
    try {
        await connect(env.MONGO_URL,
            options);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connection.once('open', () => {
    console.log('Database connected successfully');
}).on('error', (error) => {
    console.error('Database connection error: ', error);
}).on('disconnected', () => {
    console.log('Database connection is disconnected')
});

const dbDisconnect = async () => { await connection.close() }

export {
    connectDB,
    dbDisconnect
};

