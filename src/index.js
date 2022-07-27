import "./style.css";

import PubSub from 'pubsub-js';
const { EVENT_ITEM_NEW } = require("./event-types");
const { default: HTML } = require("./html");
const { default: Item } = require("./item");
const { default: List } = require("./list");
const { default: printMe } = require("./print");
const { default: UI } = require("./ui");
const { default: Storage } = require("./storage");

function initSubscriptions() {
    // DEBUG
    PubSub.subscribe(EVENT_ITEM_NEW, function(msg, item) {
        console.log(`Item Added (${msg}): ${item.getTitle()}`);
    });
    // END DEBUG
}

initSubscriptions();
const ui = new UI();
const storage = new Storage();
storage.loadAllItems();

// // Debug Items
// const l = new List();
const a = new Item("This is the first item");
List.addItem(a);
// const b = new Item("And this is the second item");
// l.addItem(b);

// console.dir(l.getItems(false));


// UI.createItems(todo, l, false);

