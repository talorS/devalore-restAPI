const mongoose = require('mongoose');

// connect to mongoDB through mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL,
            { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

mongoose.connection.once('open', () => {
    console.log('Database connected successfully');
}).on('error', (error) => {
    console.error('Database connection error: ', error);
}).on('disconnected', () => {
    console.log('Database connection is disconnected')
});

const dbDisconnect = async () => { await mongoose.connection.close().catch(e => console.error(e)); }

module.exports = {
    connectDB,
    dbDisconnect
};

