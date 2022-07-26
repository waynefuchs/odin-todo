import { EVENT_DATA_CHANGED } from "./event-types";
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
    console.log("Begin Loading!");
    isLoading = true;
}

function loadEnd() {
    isLoading = false;
    console.log("Loading Complete!");
}

export default class Storage {
    available = false;

    saveAllItems() {
        if(isLoading) return;
        const allItems = JSON.stringify(list.getItems());
        storage.setItem("list", allItems);
 
        console.log("SAVING");
        console.dir(storage.getItem(storageItem));
        console.log("SAVED");
    }

    loadAllItems() {
        loadBegin();
        const json = JSON.parse(storage.getItem(storageItem));
        loadEnd();
    }

    constructor() {
        if(!storageAvailable()) throw "Storage is unavailable!";
        this.available = true;
        PubSub.subscribe(EVENT_DATA_CHANGED, this.saveAllItems);
    }

}