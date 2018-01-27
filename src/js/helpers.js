const ENTER_KEY = 13
const c = console.log
const d = document
const ls = window.localStorage
const j = JSON
const encodeHTML = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

export {
  ENTER_KEY,
  c,
  d,
  ls,
  j
}
