import express from 'express'

const routes = express.Router()

routes
  .get('/', (req, res, next) => {
    res.render('index', {
      title: 'Home page',
      description: 'This is the home page description'
    })
  })
  .get('/template', (req, res, next) => {
    res.render('template', {
      title: 'todos',
      description: 'this is the template page for todolist app'
    })
  })

export default routes
