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
    .sort({ name: 'asc' })
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

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo: todo }))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => {
      console.log(todo.isDone)
      res.render('edit', { todo })
    })
    .then((todo) => {
      console.log(todo.isDone)
    })
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  // 上面的寫法 應用了  "解構賦值" 的語法
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      // 因checkbox 的回傳值 是 on /或是不帶值 , 而不是回傳ture /false ,
      // if (isDone === 'on') {
      //   todo.isDone = true
      // } else {
      //   todo.isDone = false
      // }
      // 因為最後 等於的值 為ture/false   根據這個邏輯 也可以寫為 下一行方式
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.post('/todos/:id/delete', (res, req) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log('localhost:3000')
})
