import ID from './data-model/id';
import TODO from './data-model/todo';
import Project from './data-model/project';
import Item from "./data-model/item";
import Log from './log';
import Message from './ui/message';

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
        console.dir(data);
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

    static addProject(name) {
        Log.debug("Storage.addProject()");
        if(name.length <= 0) return false;
        const projectObject = Project.makeObject(idProject.next(), name);
        const project = new Project(projectObject);
        todo.add(project);
        Storage.save();
        return project;
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

    static deleteItem(projectID, itemID) {
        Log.debug("Storage.deleteItem()");
        const project = todo.get('id', projectID);
        project.del('id', itemID);
        Storage.save();
    }

    static updateProjectName(project, title) {
        if(todo.contains('name', title)) {
            const existingProject = todo.get('name', title);
            // check to see if the user clicked to update, then didn't make changes
            // in other words: the existing project is this project
            if(project === existingProject) {
                console.log("update called but no change made");
                return true;
            }
            Message.notify("The project already exists.");
            return false;
        }
        project.setName(title);
        Storage.save();
        return true;
    }

    static factoryReset() {
        Log.debug("Storage.factoryReset()");
        idItem = undefined;
        idProject = undefined;
        todo = undefined;
        isLoading = false;
        db.removeItem(STORAGE_ID_ITEM);
        db.removeItem(STORAGE_ID_PROJECT);
        db.removeItem(STORAGE_DATA);
        Storage.load();
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