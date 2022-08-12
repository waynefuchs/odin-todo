import Storage from '../storage';
import Item from "../data-model/item";
import Message from './message';
import ProjectHeader from './project-header';
import ProjectBody from './project-body';

const projects = Storage.load();

export default class UI {
    static load() {
        Message.createContainer();
        UI.loadProjects();

        // UI.createHeading('h1', 'todo');

        // UI.createToggleGroup();

        // UI.createContainerTodo();
        // UI.createContainerDone();

        // document.addEventListener('keydown', UI.listenForKeyboardEvents);
    }

    static loadProjects() {
        console.log(projects.getAll());
        try {
            projects.getAll().forEach(project => UI.createProject(project));
        } catch (error) {
            console.error(`Failed to iterate projects: ${error}`);
        }
    }

    static createProject(project) {
        ProjectHeader.create(project);
        ProjectBody.create(project);
    }

    // TODO: Get this working again
    static listenForKeyboardEvents(e) {
        if(e.key === "Escape") 
            UI.handleEscapeKeyPress();
        else if(e.key === 'n' && !UIAddItem.isVisible()) {
            e.preventDefault();
            UIAddItem.toggle();
        }
    }
}