"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbDisconnect = exports.connectDB = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const process_1 = require("process");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// connect to mongoDB through mongoose
const connectDB = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(process_1.env.MONGO_URL, options);
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
mongoose_1.connection.once('open', () => {
    console.log('Database connected successfully');
}).on('error', (error) => {
    console.error('Database connection error: ', error);
}).on('disconnected', () => {
    console.log('Database connection is disconnected');
});
const dbDisconnect = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () { yield mongoose_1.connection.close(); });
exports.dbDisconnect = dbDisconnect;
//# sourceMappingURL=petsDatabase.js.map