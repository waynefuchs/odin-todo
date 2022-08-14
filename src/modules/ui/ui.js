import Storage from '../storage';
import Item from "../data-model/item";
import Message from './message';
import ProjectHeader from './project-header';
import ProjectBody from './project-body';
import Log from '../log';

let projects;

export default class UI {
    static load() {
        Log.debug("UI.load()");
        Message.createContainer();
        UI.loadProjects();
        // document.addEventListener('keydown', UI.listenForKeyboardEvents);
    }

    static loadProjects() {
        Log.debug("UI.loadProjects()");
        projects = Storage.load();
        const main = document.createElement('main');
        document.body.append(main);
        const allProjects = projects.getAll();

        allProjects.forEach((project) => {
            UI.createProject(project);
        });
        try {

        } catch (error) {
            Message.notify(`Failed to iterate projects: ${error}`);
        }
    }

    static createProject(project) {
        Log.debug("UI.createProject()");
        ProjectHeader.create(project);
        ProjectBody.create(project);
    }

    static factoryReset() {
        // Remove the current UI representation of the data
        const main = document.querySelector('main');
        UI.removeElementAndChildren(main);

        // Clear the back-end data
        Storage.factoryReset();

        // Reload the data
        UI.loadProjects();
    }




    static removeElementAndChildren(element) {
        while (element.firstChild) element.removeChild(element.firstChild);
        element.remove();
    }

    // TODO: Get this working again
    static listenForKeyboardEvents(e) {
        Log.debug("UI.listenForKeyboardEvents()");
        if(e.key === "Escape") 
            UI.handleEscapeKeyPress();
        else if(e.key === 'n' && !UIAddItem.isVisible()) {
            e.preventDefault();
            UIAddItem.toggle();
        }
    }
}