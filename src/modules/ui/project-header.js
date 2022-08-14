import Storage from '../storage';
import Project from '../data-model/project';
import Message from './message';
import UIItem from './ui-item';
import Log from '../log';
import UI from './ui';

export default class ProjectHeader {
    static create(project=null) {
        Log.debug("UI.ProjectHeader()");
        let isDefaultProject = false;

        // Default project can happen if input is null (make a new one)
        // Or if the `project.id` is equal to 0.
        if(project === null) {
            Log.debug("null project passed into ProjectHeader.create()");
            isDefaultProject = true;
            project = new Project();
        } else if(project.id === 0) {
            isDefaultProject = true;
            console.log("Processing default project.");
        } else {
            console.log("ProjectHeader.create() got:");
            console.dir(project);
        }

        // main div
        let headerDiv = document.createElement('div');
        headerDiv.id = project.getHTMLID('project-header');
        headerDiv.classList.add('project-header');
        
        // project title (used to be h2)
        let projectName = document.createElement(isDefaultProject ? 'h2' : 'input');
        if(isDefaultProject) {
            projectName.textContent = project.getName();
        } else {
            projectName.placeholder = "Project Name";
            projectName.value = project.getName();
            projectName.addEventListener('blur', (event) => {
                if(!Storage.updateProjectName(project, projectName.value)) projectName.value = project.getName();
            });
        }
        projectName.classList.add('grid-title');
        headerDiv.append(projectName);
        
        // Toggle Button Group
        ProjectHeader.createToggleButtonGroup(headerDiv, project);

        // Put the header div into the DOM
        const main = document.querySelector('main');
        main.append(headerDiv);
    }

    static createToggleButtonGroup(parent, project) {
        Log.debug("UI.createToggleBUttonGroup()");
        let containers = [];

        let div = document.createElement('div');
        div.classList.add('grid-button');

        // Toggle Button (Project)
        // This only appears as the first project (default::no project) on the page
        let projectContainer = null;
        if(project.getID() === 0) {
            const factoryReset = document.createElement('button');
            factoryReset.classList.add('material-icons');
            factoryReset.textContent = 'delete_forever';
            factoryReset.setAttribute('title', 'Factory Reset');
            factoryReset.addEventListener('click', (event) => {
                UI.factoryReset();
            });
            div.append(factoryReset);

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
        Log.debug("UI.createToggleSwitch()");
        let button = document.createElement('button');
        button.classList.add('material-icons');
        button.classList.add('toggle-button');
        // TODO: How much of this do I need??
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
        Log.debug("UI.createToggleContainer()");
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
        Log.debug("UI.turnOffAllToggles()");
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
        Log.debug("UI.DBCreateProject()");
        if(name === "") throw "Project name can not be empty.";
        if(name === null) throw "Project name was null";    
        const project = Storage.addProject(name);
        const uiProject = UI.createProject(project);
    try {
            console.log(`Created a New Project: ${name}`);
        } catch (error) {
            Message.notify(error);
        }
    }

    static DBAddItem(projectID, title) {
        Log.debug("UI.DBAddItem()");
        try {
            const project = Storage.getProject(projectID);
            const item = Storage.addItem(project, title);
            const uiItem = UIItem.create(item);
            const projectContainer = document.querySelector(project.getHTMLID(undefined, true));
            projectContainer.append(uiItem);
            console.log(`Added Item '${title}' to ProjectID '${projectID}'`);
        } catch (error) {
            Message.notify(error);
        }

    }
}