import ID from './data-model/id';
import TODO from './data-model/todo';
import Project from './data-model/project';
import Item from "./data-model/item";
import Log from './log';

// Constants
const STORAGE_ID_ITEM = "todo-id-item";
const STORAGE_ID_PROJECT = "todo-id-project";
const STORAGE_DATA = "todo-data";
const DEBUG = true;

// IDs
let idItem;
let idProject;

// Data
let todo;

// DB Access
let db = window['localStorage'];
let isLoading = false;

export default class Storage {
    static load() {
        Log.debug("Storage.load()");
        // Storage.factoryReset();

        // Disable Saving
        Storage.disableSave();

        // Every ID needs a unique Identifier
        idItem = new ID(db.getItem(STORAGE_ID_ITEM));

        // Every Project needs a unique Identifier
        idProject = new ID(db.getItem(STORAGE_ID_PROJECT));

        // Load in JSON data from browser storage,
        // and send the resulting parsed object to Projects
        const jsonData = db.getItem(STORAGE_DATA); 
        const data = JSON.parse(jsonData);
        todo = new TODO(data);

        // Enable Saving
        Storage.enableSave();

        // Write Debug Info if applicable
        Storage.debugMemory();
        Storage.debugDB();

        return todo;
    }

    static disableSave() {
        Log.debug("Storage.disableSave()");
        isLoading = true;
    }

    static enableSave() {
        Log.debug("Storage.enableSave()");
        isLoading = false;
    }
    
    static save() {
        Log.debug("Storage.save()");
        if(isLoading) throw "Attempted to save during load process.";

        console.log("Writing to browser local storage...");
        db.setItem(STORAGE_ID_ITEM, idItem);
        db.setItem(STORAGE_ID_PROJECT, idProject);
        const jsonData = JSON.stringify(todo);
        db.setItem(STORAGE_DATA, jsonData);

        Storage.debugDB();
        console.log("SAVE complete!");
    }

    static getProject(projectID) {
        Log.debug("Storage.getProject()");
        return todo.get('id', projectID);
    }

    static addItem(project, title) {
        Log.debug("Storage.addItem()");
        if(title.length <= 0) return false;
        const itemObject = Item.makeObject(idItem.next(), title, false);
        const item = new Item(itemObject);
        project.add(item);
        Storage.save();
        return item;
    }

    static factoryReset() {
        Log.debug("Storage.factoryReset()");
        db.removeItem(STORAGE_ID_ITEM);
        db.removeItem(STORAGE_ID_PROJECT);
        db.removeItem(STORAGE_DATA);
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
                    `\tPROJECT ID: ${idProject}\n`);
        console.dir(todo);
    }
}