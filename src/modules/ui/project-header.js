import Project from '../project';
import Message from './message';
// import ID from "../id";

export default class ProjectHeader {
    static create(project=null) {
        if(project === null) project = new Project();

        // main div
        let div = document.createElement('div');
        div.id = project.getHTMLID('project-header');
        div.classList.add('project-header');
        
        // project title
        let name = document.createElement('h2');
        name.classList.add('grid-title');
        name.textContent = project.getName();
        div.append(name);
        
        // Toggle Button Group
        ProjectHeader.createToggleButtonGroup(div, project);
        
        const body = document.body;
        body.append(div);
    }

    static createToggleButtonGroup(parent, project) {
        let containers = [];

        let div = document.createElement('div');
        div.classList.add('grid-button');

        // Toggle Button (Project)
        // This only appears as the first project (default::no project) on the page
        let projectContainer = null;
        if(project.getID() === "") {
            const projectToggleData = {
                buttonID: 'button-ToggleProject',
                containerID: 'container-ToggleProject',
                projectID: project.getID(),
                textOff: 'create_new_folder',
                textOn: 'cancel',
                placeholder: 'Add Project',
                popup: "Create a New Project",
                isProject: true,
                isItem: false,
            }
            const projectButton = ProjectHeader.createToggleSwitch(projectToggleData);
            projectContainer = ProjectHeader.createToggleContainer(projectToggleData);
            div.append(projectButton);
            containers.push(projectContainer);
        }

        // Toggle Button (Item)
        const itemToggleData = {
            buttonID: `button-ToggleItem-${project.getID()}`,
            containerID: `container-ToggleItem-${project.getID()}`,
            projectID: project.getID(),
            textOff: 'add_task',
            textOn: 'cancel',
            placeholder: "Add Item",
            popup: "Add Item",
            isProject: false,
            isItem: true,
        };
        const itemButton = ProjectHeader.createToggleSwitch(itemToggleData);
        const itemContainer = ProjectHeader.createToggleContainer(itemToggleData);
        div.append(itemButton);
        containers.unshift(div);
        containers.push(itemContainer);

        containers.forEach((element) => {
            parent.append(element);
        });
    }

    static createToggleSwitch(data) {
        let button = document.createElement('button');
        button.classList.add('material-icons');
        button.classList.add('toggle-button');
        button.setAttribute('title', data.popup);
        button.setAttribute('reset-title', data.popup);
        button.setAttribute('text-on', data.textOn);
        button.setAttribute('text-off', data.textOff);
        button.setAttribute('containerID', data.containerID);
        button.textContent = data.textOff;

        // (EVENT): Click Toggle Button Switch
        button.addEventListener('click', (event) => {
            const container = document.querySelector(`#${data.containerID}`);
            const isButtonOn = !container.classList.contains('hidden');

            ProjectHeader.turnOffAllToggles(button);
            
            // No try-catch necessary
            if(container === null) throw "Failed to query container";
            const textInput = container?.querySelector('input');
            if(textInput === null) throw "Failed to query text input";

            // 1. Turn off/on container.hidden
            container.classList.toggle('hidden');
            // 2. !important: Turn off/on button.selected
            button.classList.toggle('cancel');
            // 3. Set the textContent
            button.textContent = isButtonOn
                ? button.getAttribute('text-off')
                : button.getAttribute('text-on');
            // 4. Change the popup title to say 'Cancel'
            button.setAttribute('title', `Cancel ${data.popup}`);
            // Bonus: Focus the input if it just got toggled on
            if(!isButtonOn) textInput.focus();
        });
        return button;
    }

    static createToggleContainer(data) {
        // container
        let div = document.createElement('div');
        div.id = data.containerID;
        div.classList.add('hidden');
        div.classList.add('toggle-container');
        div.classList.add('grid-toggle');

        // input
        let input = document.createElement('input');
        input.name = data.containerID;
        input.id = data.containerID;
        input.placeholder = data.placeholder;
        div.append(input);

        // add button
        const button = document.createElement('button');
        button.classList.add('material-icons');
        button.classList.add('armed');
        button.setAttribute('title', data.popup);
        button.textContent = data.textOff;
        button.addEventListener('click', (event) => {
            if(data.isProject) ProjectHeader.DBCreateProject(input.value);
            else if(data.isItem) ProjectHeader.DBAddItem(data.projectID, input.value);
            input.value = "";
            input.focus();
        });
        div.append(button);

        return div;
    }

    static turnOffAllToggles(buttonIgnore=null) {
        const toggleButtons = [...document.querySelectorAll('.toggle-button')];

        toggleButtons
            .filter(button => button !== buttonIgnore)
            .forEach(button => {
                const container = document.querySelector(`#${button.getAttribute('containerID')}`);

                // No try-catch necessary
                if(container === null) throw "Unable to query button container";
                container.classList.add('hidden');
                button.classList.remove('cancel');
                button.setAttribute('title', button.getAttribute('reset-title'));
                button.textContent = button.getAttribute('text-off');
            });
    }


    static DBCreateProject(name) {
        try {
            if(name === "") throw "Project name can not be empty.";
            if(name === null) throw "Project name was null";    
            console.log(`Creating a New Project: ${name}`);
        } catch (error) {
            Message.notify(error);
        }
    }

    static DBAddItem(projectID, name) {
        try {

            console.log(`Adding Item '${name}' to ProjectID '${projectID}'`);
        } catch (error) {
            Message.notify(error);
        }

    }
}