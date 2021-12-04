const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  neme: {
    type: String,
    require: ture
  }
})

module.exports = mongoose.model('Todo', todoSchema)