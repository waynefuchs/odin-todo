import { EVENT_DATA_CHANGED } from "./event-types";
import Item from "./item";
import List from "./list";

const list = new List();
const storageItem = "list";
const type = 'localStorage';
let storage = window[type];
let isLoading = false;


function storageAvailable() {
    try {
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function loadBegin() {
    isLoading = true;
}

function loadEnd() {
    isLoading = false;
}

function loadItem(jsonItem) {
    const item = new Item(jsonItem);
    list.addItem(item);
}

export default class Storage {
    available = false;

    saveAllItems() {
        if(isLoading) return;
        storage.setItem("list", JSON.stringify(List.getItems()));
    }

    loadAllItems() {
        loadBegin();
        const json = JSON.parse(storage.getItem(storageItem));
        console.log(json);
        for(const item of json) loadItem(item);
        loadEnd();
        console.log("Loading complete")
    }

    constructor() {
        if(!storageAvailable()) throw "Storage is unavailable!";
        this.available = true;
        PubSub.subscribe(EVENT_DATA_CHANGED, this.saveAllItems);
    }

}