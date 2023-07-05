"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("@types");
const mongoose_1 = require("mongoose");
//create ORM for mongoDB
const petSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required.']
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
        enum: {
            values: Object.values(_types_1.PetType),
            message: `type is either: ${Object.values(_types_1.PetType).join(',')}.`
        },
        required: [true, 'type is required.']
    },
    age: {
        type: Number,
        required: [true, 'age is required.']
    }
});
exports.default = (0, mongoose_1.model)('pets', petSchema);
//# sourceMappingURL=petsModel.js.map