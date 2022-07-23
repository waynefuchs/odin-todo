const { default: HTML } = require("./html");
const { default: Item } = require("./item");
const { default: List } = require("./list");
const { default: printMe } = require("./print");

HTML.newDiv('', 'todo');
HTML.newDiv('', 'done');

printMe();

let todo = new List();
todo.addItem(new Item('new item', new Date()));
todo.addItem(new Item('new item', new Date()));
todo.deleteItem('new item');
todo.addItem(new Item('new item revisited', new Date()));
console.dir(todo.getItems());
todo.addItem(new Item('there should be 2', new Date()));
console.dir(todo.getItems());
console.dir(todo.getItem('new item revisited'));
console.log(todo.contains('new item revisited'));