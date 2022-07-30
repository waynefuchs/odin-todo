import List from "./list";
import Item from "./item";
import ID from './id';

const STORAGE_LIST = "todo-list";
const STORAGE_ID = "todo-id";

let storage = window['localStorage'];
let isLoading = false;

export default class Storage {
    static save() {
        if(isLoading) {
            console.error("Attempted to save during load process.");
            return;
        }
        storage.setItem(STORAGE_LIST, JSON.stringify(List.getItems()));
        storage.setItem(STORAGE_ID, ID.get());
        Storage.logStorage("Save Complete");   // debug
    }

    static load() {
        isLoading = true;
        const json = JSON.parse(storage.getItem(STORAGE_LIST));
        for(const item of json) Storage.createItemFromJSON(item);
        ID.set(storage.getItem(STORAGE_ID));
        isLoading = false;
        Storage.logStorage("Load Complete");   // debug
    }

    static createItemFromJSON(jsonItem) {
        return new Item(jsonItem);
    }

    static addItemByTitle(title) {
        if(title.length <= 0) return false;
        const jsonItem = Storage.makeJSONItem(title);
        const item = Storage.loadJSONItem(jsonItem);
        Storage.save();
        return item;
    }

    static loadJSONItem(jsonItem) {
        return List.addItem(this.createItemFromJSON(jsonItem));
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
        console.log(`${message}: ${Storage.toString()}`);
    }

    static toString() {
        return `STORAGE: ${storage.getItem(STORAGE_LIST)}\nID: ${storage.getItem(STORAGE_ID)}`;
    }
}