import ID from './data-model/id';
import TODO from './data-model/todo';
import Project from './data-model/project';
import Item from "./data-model/item";

// Constants
const STORAGE_ID_ITEM = "todo-id-item";
const STORAGE_ID_PROJECT = "todo-id-project";
const STORAGE_DATA = "todo-data";
const DEBUG = true;

// IDs
let idItem;
let idProjects;

// Data
let todo;

// DB Access
let db = window['localStorage'];
let isLoading = false;

export default class Storage {
    static load() {
        // Disable Saving
        Storage.disableSave();

        // Every ID needs a unique Identifier
        idItem = new ID(db.getItem(STORAGE_ID_ITEM));

        // Every Project needs a unique Identifier
        idProjects = new ID(db.getItem(STORAGE_ID_PROJECT));

        // Load in JSON data from browser storage,
        // and send the resulting parsed object to Projects
        const jsonData = db.getItem(STORAGE_DATA); 
        todo = new TODO(JSON.parse(jsonData));

        // Enable Saving
        Storage.enableSave();

        // Write Debug Info if applicable
        Storage.debugMemory();
        Storage.debugDB();

        return todo;
    }

    static disableSave() {
        isLoading = true;
    }

    static enableSave() {
        isLoading = false;
    }
    
    static save() {
        if(isLoading) {
            console.error("Attempted to save during load process.");
            return;
        }

        // TODO: Actually save stuff

        Storage.debugDB();
    }

    static getProject(projectID) {
        return todo.get('id', projectID);
    }

    static addItem(project, title) {
        if(title.length <= 0) return false;
        const jsonItem = Item.makeJSON(idItem.next(), title, false);
        const item = new Item(jsonItem);
        project.add(item);
        Storage.save();
        return item;
    }

    // FIX
    static delegateSetDone(id, done) {
        const item = List.getItemByID(id);
        item.setDone(done);
        Storage.save();
    }

    // FIX
    static delegateDeleteItem(id) {
        const result = List.deleteItemByID(id);
        if(result) Storage.save();
        return result;
    }


    // DEBUG
    static debugDB() {
        if(!DEBUG) return;
        console.log('DEBUG DB:\n' +
                    `\tITEM ID: ${db.getItem(STORAGE_ID_ITEM)}\n` +
                    `\tPROJECT ID: ${db.getItem(STORAGE_ID_PROJECT)}\n` +
                    `\tSTORAGE: ${db.getItem(STORAGE_DATA)}`);
    }

    static debugMemory() {
        if(!DEBUG) return;
        console.log('DEBUG MEMORY:\n' +
                    `\tITEM ID: ${idItem}\n` +
                    `\tPROJECT ID: ${idProjects}\n`);
        console.dir(todo);
    }
}