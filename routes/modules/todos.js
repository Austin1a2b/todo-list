// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')

//設定路由

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  const todo = new Todo({
    name: name
  })
  return todo.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo: todo }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => {
      res.render('edit', { todo })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router