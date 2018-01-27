import { ENTER_KEY, c, d, j, ls } from './helpers'
import TodoItem from './TodoItem'

const todoInput = d.querySelector('#todo-input')
const todoItems = d.querySelector('#todo-list')
const footer = d.querySelector('#footer')

export default class TodoList {
  constructor (key) {
    this.key = key

    if (!ls.getItem(key)) {
      ls.setItem(key, j.stringify([]))
    }

    this.addTodoItem = this.addTodoItem.bind(this)
    this.removeTodoItem = this.removeTodoItem.bind(this)
    this.editTodoItem = this.editTodoItem.bind(this)
    this.renderTodoItem = this.renderTodoItem.bind(this)
    this.render = this.render.bind(this)
  }

  addTodoItem (e) {
    if (!e.target.value) {
      window.alert('You can\'t enter an empty task')
      return
    }

    if (e.keyCode === ENTER_KEY) {
      let newTodoItem = new TodoItem(e.target.value)
      let todoCollection = j.parse(ls.getItem(this.key))
      c(todoCollection)

      todoCollection.push(newTodoItem)
      ls.setItem(this.key, j.stringify(todoCollection))
      this.renderTodoItem(newTodoItem)
      e.target.value = null
      this.showFooter()
    }
  }

  removeTodoItem (e) {
    if (e.target.localName === 'button') {
      let id = e.target.dataset.id
      let todoCollection = j.parse(ls.getItem(this.key)).filter(el => el.id.toString() !== id)
      ls.setItem(this.key, j.stringify(todoCollection))
      e.target.parentElement.remove()
      this.showFooter()
    }
  }

  editTodoItem (e) {
    if (e.target.localName === 'label') {
      let label = e.target
      let id = label.parentElement.id
      let todoCollection = j.parse(ls.getItem(this.key))
      let toEdit = todoCollection.findIndex(task => task.id.toString() === id)

      const saveTask = e => {
        e.returnValue = false
        todoCollection[toEdit].name = e.target.textContent
        ls.setItem(this.key, j.stringify(todoCollection))
        e.target.blur()
        c(e.target.textContent)
      }

      label.addEventListener('blur', e => saveTask(e))
      label.addEventListener('keydown', e => (e.keyCode === ENTER_KEY) && e.preventDefault())
      label.addEventListener('keyup', e => (e.keyCode === ENTER_KEY) && saveTask(e))
    }
  }

  renderTodoItem (item) {
    let template = `
      <li class="todo__list__item" id="${item.id}">
        <input class="todo__list__item__checkbox" name="todo1" data-id="${item.id}" type="checkbox"><label contenteditable="true">${item.name}</label><button class="todo__list__item__destroy" data-id="${item.id}">X</button>
      </li>
    `
    const list = d.querySelector('#todo-list')
    list.insertAdjacentHTML('afterbegin', template)
  }

  render () {
    let items = j.parse(ls.getItem(this.key))

    items.forEach(item => this.renderTodoItem(item))

    todoInput.addEventListener('keyup', this.addTodoItem)
    todoItems.addEventListener('click', this.removeTodoItem)
    todoItems.addEventListener('click', this.editTodoItem)

    this.showFooter()
  }

  showFooter () {
    if (j.parse(ls.getItem(this.key)).length) {
      footer.classList.remove('is-hidden')
    } else {
      footer.classList.add('is-hidden')
    }
  }
}
