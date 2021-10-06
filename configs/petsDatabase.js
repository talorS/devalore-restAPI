const mongoose = require('mongoose');

// connect to mongoDB through mongoose
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true });
    
mongoose.connection.once('open', () => {
    console.log('Database connected successfully');
}).on('error', (error) => {
    console.log('Database connection error: ', error);
}).on('disconnected', () => {
    console.log('Database connection is disconnected')
});