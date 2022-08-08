import ID from "../id";

export default class ProjectHeader {
    static create(project) {
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
        div.append(ProjectHeader.createToggleButtonGroup(project));
        

        const body = document.body;
        body.append(div);
    }

    static createToggleButtonGroup(project) {
        let div = document.createElement('div');
        div.classList.add('grid-button');

        // Toggle Button (Project)
        if(project.getName() === "") div.append(ProjectHeader.createToggleSwitch(project, 'create_new_folder'));

        // Toggle Button (Item)
        div.append(ProjectHeader.createToggleSwitch(project, 'add_task'));

        return div;
    }

    static createToggleSwitch(project, buttonText) {
        let button = document.createElement('button');
        button.classList.add('material-icons');
        button.textContent = buttonText;
        button.addEventListener('click', (event) => {
            alert(project.getHTMLID('add-project'));
        });
        return button;
    }

    static createToggleContainer(project, placeholder) {
        let div = document.createElement('div');
        div.id = "CONTINUEHERE";
    }

}