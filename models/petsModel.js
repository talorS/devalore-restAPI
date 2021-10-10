const mongoose = require('mongoose');

//create ORM for mongoDB
const petSchema = new mongoose.Schema({
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
    default: Date.now()
  },
  type: {
    type: String,
    enum: ['Dog', 'Cat','Hourse','Bag'],
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('pets', petSchema);

