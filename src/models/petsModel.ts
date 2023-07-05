import { PetSchema, PetType } from '@types';
import { Schema, model } from 'mongoose';

//create ORM for mongoDB
const petSchema = new Schema<PetSchema>({
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
      values: Object.values(PetType),
      message: `type is either: ${Object.values(PetType).join(',')}.`
    },
    required: [true, 'type is required.']
  },
  age: {
    type: Number,
    required: [true, 'age is required.']
  }
});

export default model<PetSchema>('pets', petSchema);

