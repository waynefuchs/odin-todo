const { default: HTML } = require("./html");
const { default: Item } = require("./item");
const { default: List } = require("./list");
const { default: printMe } = require("./print");
const { default: UI } = require("./ui");

const body = document.querySelector('body');

const l = new List();
const a = new Item("a");
console.log(a.getID());
const b = new Item("b");
console.log(b.getID());
l.addItem(a);
l.addItem(b);

console.dir(l.getItems(false));

const todo = HTML.div('', 'todo');
const done = HTML.div('', 'done');

UI.createItems(todo, l, false);

body.append(todo);
body.append(done);
