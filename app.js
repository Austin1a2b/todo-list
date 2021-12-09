const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphdbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes') // 引用路由器

const Todo = require('./models/todo')

const app = express()

app.engine('hbs', exphdbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))  //後續才能用 req.body.
app.use(methodOverride('_method'))   // 將 HTML表單路徑  ?_method=動詞  轉成 對應 app.js 的 app.動詞('網址')
app.use(routes)    // 將 request 導入路由器

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


app.listen(3000, () => {
  console.log('localhost:3000')
})
