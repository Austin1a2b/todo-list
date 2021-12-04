const mongoose = require('mongoose')
const Todo = require('../todo')
//因為Todo 對於 此檔案(todoseeder)而言 是在上一層 所以 開頭為".." 也就是 先回到上一層資料夾 在去找 /Todo 檔名的檔案 

mongoose.connect('mongodb://localhost/todo-list')

cosnt db = mongoose.connection

db.on('error', () => {
  console.log('mongodb')
})

db.once('open', () => {
  console.log('mongodb connected')
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }
  console.log('done')
})