import ID from './id';
import ProjectList from "./project-list";

const STORAGE_DATA = "todo-data";
const STORAGE_ID_ITEM = "todo-id-item";
const STORAGE_ID_PROJECTS = "todo-id-projects";
const DEBUG = true;

let idItem;
let idProjects;
let projectList;

let db = window['localStorage'];
let isLoading = false;

export default class Storage {
    static load() {
        Storage.disableSave();

        // Every ID needs a unique Identifier
        idItem = new ID(db.getItem(STORAGE_ID_ITEM));

        // Every Project needs a unique Identifier
        idProjects = new ID(db.getItem(STORAGE_ID_PROJECTS));

        // Load in JSON data from browser storage,
        // and send the resulting parsed object to Projects
        const jsonData = db.getItem(STORAGE_DATA); 
        projectList = new ProjectList(JSON.parse(jsonData));

        Storage.enableSave();

        Storage.debugMemory();
        Storage.debugDB();

        return projectList;
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

    // FIX
    static delegateAddItem(title) {
        if(title.length <= 0) return false;
        const jsonItem = Storage.makeJSONItem(title);
        const item = Storage.loadJSONItem(jsonItem);
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
        console.log('DEBUG DB:\n' +
                    `\tITEM ID: ${db.getItem(STORAGE_ID_ITEM)}\n` +
                    `\tPROJECT ID: ${db.getItem(STORAGE_ID_PROJECTS)}\n` +
                    `\tSTORAGE: ${db.getItem(STORAGE_DATA)}`);
    }

    static debugMemory() {
        console.log('DEBUG MEMORY:\n' +
                    `\tITEM ID: ${idItem}\n` +
                    `\tPROJECT ID: ${idProjects}\n`);
        console.dir(projectList);
    }
}