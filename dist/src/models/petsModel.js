"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//create ORM for mongoDB
const petSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    },
    deleted_at: {
        type: Date,
        default: undefined
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    type: {
        type: String,
        enum: ['Dog', 'Cat', 'Horse', 'Bag'],
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});
exports.default = (0, mongoose_1.model)('pets', petSchema);
//# sourceMappingURL=petsModel.js.map