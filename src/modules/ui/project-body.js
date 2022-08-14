import Project from "../data-model/project";
import Item from "../data-model/item";
import UIItem from "./ui-item";

export default class ProjectBody {
    static create(project) {
        const projectDiv = ProjectBody.createContainerElement(project);

        const items = project.getAll();
        items.forEach(item => projectDiv.append(UIItem.create(item)));
    }

    static createContainerElement(project) {
        let projectDiv = document.createElement('div');
        projectDiv.id = project.getHTMLID();
        projectDiv.classList.add('project');
        projectDiv.classList.add('dropzone');

        // Drag and Drop
        projectDiv.addEventListener('dragover', (event) => {
            event.preventDefault();
            const afterElement = ProjectBody.getDragElementToPlaceBefore(projectDiv, event.clientY);
            const element = document.querySelector('.dragging');
            const index = [...projectDiv.querySelectorAll('.draggable')].indexOf(element);
            if(afterElement == null) projectDiv.appendChild(element);
            else projectDiv.insertBefore(element, afterElement);
        });
        projectDiv.addEventListener('drop', (event) => {
            let dragResult = ProjectBody.dragGetData(event);
            const element = projectDiv.querySelector(`#${dragResult.id}`);
            dragResult.endProjectID = projectDiv.id;
            dragResult.endIndex = [...projectDiv.children].indexOf(element);
            // TODO: Make this do something
            console.log(`FROM: project:${dragResult.startProjectID}, id:${dragResult.id}`);
            console.log(`  TO: project:${dragResult.endProjectID}, position:${dragResult.endIndex}`);
        });

        const main = document.querySelector('main');
        main.append(projectDiv);

        return projectDiv;
    }

    static dragGetData(event) {
        return JSON.parse(event.dataTransfer.getData('text/plain'));
    }

    static getDragElementToPlaceBefore(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if(offset < 0 && offset > closest.offset) return {offset, element: child};
            else return closest;
        }, {offset: Number.NEGATIVE_INFINITY}).element;
    }
}