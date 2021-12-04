const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphdbs = require('express-handlebars')

const app = express()

app.engine('hbs', exphdbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost/todo-list') // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('localhost:3000')
})