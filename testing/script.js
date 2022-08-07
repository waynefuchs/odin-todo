const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.dropzone');

draggables.forEach(element => {
    element.draggable = true;
    element.addEventListener('dragstart', (event) => {
        element.classList.add('dragging');
        dragSetData(event);
    });
    element.addEventListener('dragend', (event) => {
        element.classList.remove('dragging');
    });
});


containers.forEach(container => {
    container.addEventListener('dragover', (event) => {
        event.preventDefault();
        const afterElement = getDragElementToPlaceBefore(container, event.clientY);
        const element = document.querySelector('.dragging');
        const index = [...container.querySelectorAll('.draggable')].indexOf(element);
        if(afterElement == null) container.appendChild(element);
        else container.insertBefore(element, afterElement);
    });
    container.addEventListener('drop', (event) => {
        let dragResult = dragGetData(event);
        const element = container.querySelector(`#${dragResult.id}`);
        dragResult.endProjectID = container.id;
        dragResult.endIndex = [...container.children].indexOf(element);
        console.log(`FROM: project:${dragResult.startProjectID}, id:${dragResult.id}`);
        console.log(`  TO: project:${dragResult.endProjectID}, position:${dragResult.endIndex}`);
    });
});

function dragSetData(event) {
    event.dataTransfer.setData('text/plain', JSON.stringify({
            id: event.target.id,
            startProjectID: event.target.parentElement.id,
        }));
}

function dragGetData(event) {
    return JSON.parse(event.dataTransfer.getData('text/plain'));
}

function getDragElementToPlaceBefore(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if(offset < 0 && offset > closest.offset) return {offset, element: child};
        else return closest;
    }, {offset: Number.NEGATIVE_INFINITY}).element;
}