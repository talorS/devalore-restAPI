const mongoose = require('mongoose');

// connect to mongoDB through mongoose
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true}).
    catch(error => console.error(error));
    
mongoose.connection.once('open', () => {
    console.log('Database connected successfully');
}).on('error', (error) => {
    console.error('Database connection error: ', error);
}).on('disconnected', () => {
    console.log('Database connection is disconnected')
});

exports.dbDisconnect = async() => { await mongoose.connection.close().catch(e => console.error(e));}

