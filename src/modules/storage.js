import Project from "./project";
import List from "./list";
import Item from "./item";
import ID from './id';

const STORAGE_PROJECT = "todo-project";
const STORAGE_LIST = "todo-list";
const STORAGE_ID_ITEM = "todo-id";
const DEBUG_ON = false;

let db = window['localStorage'];
let isLoading = false;
let itemID = new ID(0);


export default class Storage {
    static save() {
        if(isLoading) {
            console.error("Attempted to save during load process.");
            return;
        }
        // db.setItem(STORAGE_LIST, JSON.stringify(List.getItems()));
        db.setItem(STORAGE_ID_ITEM, ID.get());
        Storage.logStorage("Save Complete");   // debug
    }

    static load() {
        isLoading = true;
        ID.set(db.getItem(STORAGE_ID_ITEM));
        const json = JSON.parse(db.getItem(STORAGE_LIST));
        Storage.loadJSONArray(json);
        isLoading = false;
        Storage.logStorage("Load Complete");   // debug
        return List.getItems();
    }

    static loadJSONArray(json) {
        if(json === null) return;
        for(const jsonItem of json) {
            const item = Storage.newItemFromJSON(jsonItem);
            List.add(item);
        }
    }

    static loadJSONItem(jsonItem) {
        return List.add(this.newItemFromJSON(jsonItem));
    }

    static newItemFromJSON(jsonItem) {
        return new Item(jsonItem);
    }

    static addItemByTitle(title) {
        if(title.length <= 0) return false;
        const jsonItem = Storage.makeJSONItem(title);
        const item = Storage.loadJSONItem(jsonItem);
        Storage.save();
        return item;
    }

    static makeJSONItem(title) {
        return {
            id: ID.getNext(),
            title,
            done: false,
            originDate: Date.now(),
            dueDate: false
        };
    }

    static logStorage(message) {
        if(!DEBUG_ON) return;
        console.log(`${message}: ${Storage.toString()}`);
    }

    static toString() {
        return `ID: ${db.getItem(STORAGE_ID_ITEM)}\nSTORAGE: ${db.getItem(STORAGE_LIST)}`;
    }

    static setDone(id, done) {
        const item = List.getItemByID(id);
        item.setDone(done);
        Storage.save();
    }

    static deleteItem(id) {
        const result = List.deleteItemByID(id);
        if(result) Storage.save();
        return result;
    }
}