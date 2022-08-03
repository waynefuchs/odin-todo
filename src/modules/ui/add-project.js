const body = document.querySelector("body");

let isAddProjectVisible = true;

export default class UIAddProject {
    static create() {
        const toggleDiv = document.createElement('div');
        toggleDiv.id = 'add-project-toggle';
        toggleDiv.classList.add('hidden');

        const label = document.createElement('label');
        label.htmlFor = 'input-project-name';
        label.textContent = "Project Name";

        const inputTextProjectTitle = document.createElement('input');
        inputTextProjectTitle.id = 'input-project-name';
        inputTextProjectTitle.type = 'text';
        // inputTextProjectTitle.addEventListener('keydown', (e) => {
        //     if(e.key == 'Enter') UIAddProject.addProjectByName();
        // });

        const buttonAdd = document.createElement('button');
        buttonAdd.textContent = "Add";
        // buttonAdd.addEventListener('click', UIAddProject.addProjectByName);

        // Button to show and hide the #add-item-toggle (input / button)
        const buttonToggle = document.createElement('button');
        buttonToggle.id = "button-toggle-project";
        buttonToggle.classList.add('material-icons');
        buttonToggle.textContent = 'create_new_folder';
        buttonToggle.addEventListener('click', UIAddProject.toggle);

        toggleDiv.append(label);
        toggleDiv.append(inputTextProjectTitle);
        toggleDiv.append(buttonAdd);

        return {toggleDiv, buttonToggle};
    }

    static toggle() {
        const button = document.querySelector('#button-toggle-project');
        button.classList.toggle('cancel');
        const addItem = body.querySelector('#add-project-toggle');
        if(isAddProjectVisible) 
            UIAddProject.setHidden(addItem);
        else 
            UIAddProject.setVisible(addItem);
    }

    static setVisible(element) {
        isAddProjectVisible = true;
        element.classList.add('hidden');
        element.querySelector('#input-project-name').focus();
        body.querySelector('#button-toggle-project').textContent = 'create_new_folder';
    }

    static setHidden(element) {
        isAddProjectVisible = false;
        element.classList.remove('hidden');
        body.querySelector('#button-toggle-project').textContent = 'folder_open';
    }

}
