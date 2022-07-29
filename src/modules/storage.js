import List from "./list";
import Item from "./item";

const STORAGE_LIST = "list";

let storage = window['localStorage'];

export default class Storage {
    static isStorageAvailable() {
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

    static saveAllItems() {
        if(isLoading) return;
        storage.setItem("list", JSON.stringify(List.getItems()));
    }

    static loadAllItems() {
        loadBegin();
        const json = JSON.parse(storage.getItem(STORAGE_LIST));
        console.log(json);
        for(const item of json) Storage._loadItem(item);
        loadEnd();
        console.log("Loading complete")
    }

    static _loadItem(jsonItem) {
        const item = new Item(jsonItem);
        list.addItem(item);
    }

    static makeItemJson(title) {
        return {
            id: ,
            title,
        }
    }

}