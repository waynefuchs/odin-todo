let projectList = [];
let projectID = 0;

export default class Project {
    // ID Manipulation
    static getID() {
        return projectID;
    }
    static getNextID() {
        return projectID++;
    }
    static setID(id) {
        projectID = id;
    }

    static add(projectID, item) {
        const list = projectList.find(
    }

    static getProjects() {
        return projectList;
    }

    static createProject(id, name) {
        projectList.push({id, name});
    }

    // returns number of projects deleted
    static deleteProject(id) {
        const oldLength = projectList.length;
        projectList = projectList.filter(o => o.id === id);
        return oldLength - projectList.length;
    }

    static deleteProjectByName(name) {
        return deleteProject(Project.getID(name));
    }

    static getID(name) {
        return projects.find(o => o.name === name);
    }
}