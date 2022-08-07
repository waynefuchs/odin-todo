// elements = document.querySelectorAll('.draggable');
// for(const element of elements) {
//     element.draggable = true;
//     element.addEventListener('dragstart', dragStart);
//     element.addEventListener('drop', dragDropped);

//     element.addEventListener('dragenter', dragEnter);
//     element.addEventListener('dragover', dragOver);

//     element.addEventListener('dragleave', dragLeave);
// }

const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.dropzone');

draggables.forEach(element => {
    element.draggable = true;
    element.addEventListener('dragstart', (event) => {
        element.classList.add('dragging');
    });
    element.addEventListener('dragend', (event) => {
        element.classList.remove('dragging');
    });
});


containers.forEach(container => {
    container.addEventListener('dragover', (event) => {
        event.preventDefault();
        const afterElement = getDragAfterElement(container, event.clientY);
        const element = document.querySelector('.dragging');
        if(afterElement == null) {
            container.appendChild(element);
        } else {
            container.insertBefore(element, afterElement);
        }
    });
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if(offset < 0 && offset > closest.offset) {
            return {offset, element: child};
        } else {
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element;
}