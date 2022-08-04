import Container from "./container";

export default class Project {
    id;
    name;
    list;

    constructor(id, name, list=null) {
        let project = new Container();
        if(id === null || id === undefined) return null;
        if(name === null || name === undefined) return null;
        project.id = id;
        project.name = name;
        project.list = list || new Container();
        return project;
    }
}