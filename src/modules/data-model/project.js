import Container from './container';
import Item from './item';

// A collection of "Item" objects
export default class Project extends Container {
  id;

  name;

  constructor(project = null) {
    super();
    const projectObject = project ?? {};
    if (typeof projectObject === 'string'
    || projectObject instanceof String) {
      throw new Error('project.js: Object data expected');
    }

    // Assign class variables
    this.id = projectObject.id ?? 0; // 'project-0' is equivalent to "NO PROJECT"
    this.name = projectObject.name ?? 'TODO'; // 'TODO' is the default project name

    // Add Items
    projectObject.list.forEach((itemObject) => {
      this.add(new Item(itemObject));
    });
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getHTMLID(prefix = 'project-', hash = false) {
    return (hash ? '#' : '') + prefix + this.id;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      list: this.list,
    };
  }

  static makeObject(id, name) {
    return { id, name };
  }
}
