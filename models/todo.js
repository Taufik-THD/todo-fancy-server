const mongoose = require('mongoose');
const Schema = mongoose.Schema

const todoSchema = new Schema({
  activity: { type: String, required: true },
  status: { type: Boolean, required: true },
  UserId: { type: Schema.Types.ObjectId, ref: 'User' }
},{
  timestamps: true
})

const todo = mongoose.model('Todo', todoSchema)

module.exports = todo;
