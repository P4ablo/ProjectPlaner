class Tooltip {}

class ProjectItem {
    constructor(id, updateProjectList) {
        this.id = id;
        this.updateProjectListHandler = updateProjectList;
        this.connectMoreInfoButton();
        this.connectSwitchButton();
    }

    connectSwitchButton() {
        const projItemElement = document.getElementById(this.id);
        const switchBtn = projItemElement.querySelector('button:last-of-type');
        switchBtn.addEventListener('click', this.updateProjectListHandler );
    }

    connectMoreInfoButton() {

    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;
        
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        // console.log(prjItems);
        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)));
        }
        // console.log(this.projects);
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.swithcHandler = switchHandlerFunction;
    }

    addProject() {
        console.log(this);
    }

    switchProject(projectId) {
        // const projectIndex = this.projects.findIndex(p => p.id === projectId);
        // this.projects.splice(projectIndex, 1);
        this.swithcHandler(this.projects.find(p => p.id === projectId));
        this.projects = this.projects.filter(p => p.id !== projectId);
        activeProjectList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));
        finishedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');
    }
}

App.init();