export default class TodoItem {
  constructor (name) {
    this.id = new Date().getTime()
    this.name = name
    this.isComplete = false
    this.isActive = true
    return this
  }
}
