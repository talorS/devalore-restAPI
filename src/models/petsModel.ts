import { PetSchema } from '@types';
import { Schema, model } from 'mongoose';

//create ORM for mongoDB
const petSchema = new Schema<PetSchema>({
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

export default model<PetSchema>('pets', petSchema);

