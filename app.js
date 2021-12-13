const express = require('express')
const exphdbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes') // 引用路由器
require('./config/mongoose')

const app = express()

app.engine('hbs', exphdbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))  //後續才能用 req.body.
app.use(methodOverride('_method'))   // 將 HTML表單路徑  ?_method=動詞  轉成 對應 app.js 的 app.動詞('網址')
app.use(routes)    // 將 request 導入路由器

app.listen(3000, () => {
  console.log('localhost:3000')
})