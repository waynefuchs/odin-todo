import Container from './container';
import Project from './project';

// A collection of "Project" objects
export default class TODO extends Container {
  constructor(todo) {
    super();
    const todoObject = todo ?? [];
    if (typeof todoObject === 'string' || todoObject instanceof String) {
      throw new Error('todo.js: Object data expected');
    }

    // Iterate the project list and add the loaded items
    todoObject.list.forEach((project) => this.add(new Project(project)));

    // Ensure a 'default' TODO exists.
    if (!this.contains('id', 0)) this.add(new Project());
  }

  toJSON() {
    return {
      list: this.list,
    };
  }
}
