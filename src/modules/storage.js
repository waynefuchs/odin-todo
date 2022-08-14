import ID from './data-model/id';
import TODO from './data-model/todo';
import Project from './data-model/project';
import Item from "./data-model/item";
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
        isLoading = true;
    }

    static enableSave() {
        isLoading = false;
    }
    
    static save() {
        if(isLoading) throw "Attempted to save during load process.";

        db.setItem(STORAGE_ID_ITEM, idItem);
        db.setItem(STORAGE_ID_PROJECT, idProject);
        const jsonData = JSON.stringify(todo);
        db.setItem(STORAGE_DATA, jsonData);

        Storage.debugDB();
    }

    static isProjectEmpty(project) {
        if(project.getAll().length > 0) return true;
        return false;
    }

    static getProject(projectID) {
        return todo.get('id', projectID);
    }

    static addProject(name) {
        if(name.length <= 0) return false;
        const projectObject = Project.makeObject(idProject.next(), name);
        const project = new Project(projectObject);
        todo.add(project);
        Storage.save();
        return project;
    }

    static deleteProject(project) {
        const success = todo.delete(project.getID());
        if(success) Storage.save();
        return success;
    }

    static addItem(project, title) {
        if(title.length <= 0) return false;
        const itemObject = Item.makeObject(idItem.next(), title, false);
        const item = new Item(itemObject);
        project.add(item);
        Storage.save();
        return item;
    }

    static deleteItem(projectID, itemID) {
        const project = todo.get('id', projectID);
        project.delete('id', itemID);
        Storage.save();
    }

    static updateProjectName(project, title) {
        if(todo.contains('name', title)) {
            const existingProject = todo.get('name', title);
            // check to see if the user clicked to update, then didn't make changes
            // in other words: the existing project is this project
            if(project === existingProject) return true;
            Message.notify("The project already exists.");
            return false;
        }
        project.setName(title);
        Storage.save();
        return true;
    }

    static factoryReset() {
        idItem = undefined;
        idProject = undefined;
        todo = undefined;
        isLoading = false;
        db.removeItem(STORAGE_ID_ITEM);
        db.removeItem(STORAGE_ID_PROJECT);
        db.removeItem(STORAGE_DATA);
        Storage.load();
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