elements = document.querySelectorAll('.draggable');
for(const element of elements) {
    element.draggable = true;
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('drop', dragDropped);

    element.addEventListener('dragenter', dragEnter);
    element.addEventListener('dragover', dragOver);

    element.addEventListener('dragleave', dragLeave);
}

let blah;

function dragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    const items = Array.from(document.querySelectorAll('div.drag'));
    e.target.style.display = "absolute";
    var index = items.indexOf(e.target);
    e.target.classList.remove('dragable');
    e.target.classList.add('dragging');

    const data = {
        id: e.target.id,
        index
    }
    e.dataTransfer.setData('text/plain', JSON.stringify(data));
}

function isDraggingAbove(e) {
    const elementRect = e.target.getBoundingClientRect();
    const yElementPosition = elementRect.top + (e.target.offsetHeight / 2);
    const yDragPosition = e.pageY;
    return yDragPosition <= yElementPosition;
}

function dragEnter(e) {
    dragOver(e);
}

function dragOver(e) {
    cancelDefault(e);
    if(isDraggingAbove(e)) {
        e.target.classList.remove('moveBelow');
        e.target.classList.add('moveAbove');
    } else {
        e.target.classList.remove('moveAbove');
        e.target.classList.add('moveBelow');
    }
}

function dragLeave(e) {
    e.target.classList.remove('moveAbove');
    e.target.classList.remove('moveBelow');
    cancelDefault(e);
}

function dragDropped(e) {
    let dragSource = JSON.parse(e.dataTransfer.getData('text/plain'));
    dragSource.element = document.querySelector(`#${dragSource.id}`);

    // remove any dragging CSS
    dragSource.element.classList.remove('dragging');
    dragSource.element.classList.add('dragable');
    dragLeave(e);

    // perform the move
}

function cancelDefault(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}