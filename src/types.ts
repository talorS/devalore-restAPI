import { ConnectOptions, ObjectId } from "mongoose"

export interface ConnectionOptionsExtend extends ConnectOptions {
    useNewUrlParser: boolean
    useUnifiedTopology: boolean
}

enum PetType {
    DOG = 'Dog',
    CAT = 'Cat',
    HORSE = 'Horse',
    BAG = 'Bag'
}

export type PetSchema = {
    _id: ObjectId;
    name: string;
    deleted_at: Date;
    created_at: Date;
    type: PetType;
    age: number;
}