const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphdbs = require('express-handlebars')

const Todo = require('./models/todo')

const app = express()

app.engine('hbs', exphdbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

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
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  res.render('new')
})


app.post('/todos', (req, res) => {
  const name = req.body.name
  const todo = new Todo({
    name: name
  })
  return todo.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})




app.listen(3000, () => {
  console.log('localhost:3000')
})