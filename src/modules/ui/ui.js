import Storage from '../storage';
import Message from './message';
import ProjectHeader from './project-header';
import ProjectBody from './project-body';

let projects;

export default class UI {
  static load() {
    Message.createContainer();
    UI.loadProjects();
    // document.addEventListener('keydown', UI.listenForKeyboardEvents);
  }

  static loadProjects() {
    projects = Storage.load();
    const main = document.createElement('main');
    document.body.append(main);
    const allProjects = projects.getAll();

    try {
      allProjects.forEach((project) => {
        UI.createProject(project);
      });
    } catch (error) {
      Message.notify(`Failed to iterate projects: ${error}`);
    }
  }

  static createProject(project) {
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
}
