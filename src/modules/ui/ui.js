import Storage from '../storage';
import Item from "../data-model/item";
import Message from './message';
import ProjectHeader from './project-header';
import ProjectBody from './project-body';
import Log from '../log';

const projects = Storage.load();

export default class UI {
    static load() {
        Log.debug("UI.load()");
        Message.createContainer();
        UI.loadProjects();

        // UI.createHeading('h1', 'todo');

        // UI.createToggleGroup();

        // UI.createContainerTodo();
        // UI.createContainerDone();

        // document.addEventListener('keydown', UI.listenForKeyboardEvents);
    }

    static loadProjects() {
        Log.debug("UI.loadProjects()");
        const allProjects = projects.getAll()
        try {
            allProjects.forEach((project) => {
                UI.createProject(project);
            });
        } catch (error) {
            console.error(`Failed to iterate projects: ${error}`);
        }
    }

    static createProject(project) {
        Log.debug("UI.createProject()");
        ProjectHeader.create(project);
        ProjectBody.create(project);
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