import express from 'express'

const routes = express.Router()

routes
  .get('/', (req, res, next) => {
    res.render('index', {
      title: 'todos',
      description: 'Todo List web app with vanilla JS'
    })
  })
  .get('/template', (req, res, next) => {
    res.render('template', {
      title: 'todos',
      description: 'this is the template page for todolist app'
    })
  })

export default routes
