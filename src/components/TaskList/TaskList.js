function TaskList()
{
    data = localStorage.getItem('todolist') ? JSON.parse(localStorage.getItem('todolist')) : null;

    return {
        idCounter: data ? data.idCounter : 0,
        dragTarget: '',
        dragSource: '',
        tasksData: data ? data.tasks : [],
        firstRender: true,
        tasks: [],
        components: {},
        add: function(task) {
            this.tasks.push({ id: this.idCounter, task: task });
            this.idCounter++;

            document.getElementById(this.components.container.id)?.remove();
            this.save();
            return this.render(this.components.container.classList);
        },
        remove: function(id) {
            this.tasks = this.tasks.filter((item) => {
                return item.id != id
            });

            document.getElementById(this.components.container.id)?.remove();
            this.save();
            return this.render(this.components.container.classList);
        },
        reposition: function(sourceId, destinationId) {
            let sourcePosition = this.tasks.findIndex((item) => sourceId == item.id);
            let destinationPosition = this.tasks.findIndex((item) => destinationId == item.id);
            let transferedTask = this.tasks[sourcePosition];
            
            this.tasks.splice(sourcePosition, 1);
            this.tasks.splice(destinationPosition, 0, transferedTask);
            this.save();
            
            return this.render(this.components.container.classList);
        },
        filter: function(filterFunction) {
            document.getElementById(this.components.container.id)?.remove();
            return this.render(
                this.components.container.classList,
                providedTasks=this.tasks.filter((item) => filterFunction(item.task))
            );
        },
        delete: function(checkFunction) {
            this.tasks = this.tasks.filter((item) => !checkFunction(item.task));
            
            document.getElementById(this.components.container.id)?.remove();
            this.save();
            
            return this.render(this.components.container.classList);
        },
        render: function(classList, providedTasks=null) {
            let container = document.createElement('div');
            let displayedTasks = [];
            
            if(this.firstRender)
            {
                this.tasks = this.tasksData.map(item => {
                    return { 
                        id: item.id, 
                        task: Task(item.task.description, 
                            item.task.title, 
                            new Date(item.task.due), 
                            completed=item.task.completed,
                            taskList=this)
                    }
                });
                this.firstRender = false;
            }

            displayedTasks = providedTasks ? providedTasks : this.tasks;

            container.setAttribute('id', 'todolist');
            displayedTasks.forEach((item) => {
                let renderedTask = item.task.render(['task-card']);
                
                renderedTask.setAttribute('id', item.id);

                renderedTask.addEventListener('dragstart', (event) => {
                    this.dragSource = event.target.id;
                });

                renderedTask.addEventListener("dragenter", (event) => {
                    this.dragTarget = event.target.id; 
                    event.preventDefault();                 
                });
                
                renderedTask.addEventListener("dragover", (event) => {
                    event.preventDefault();             
                });
                
                renderedTask.addEventListener("drop", (event) => {
                    this.onTaskDrop(event);
                });
                
                container.append(renderedTask);
            });

            container.classList.add(...classList); //style component

            this.components.container = container;

            return this.components.container;
        },
        onTaskDrop: function (event) {
            const renderedList = this.reposition(this.dragSource, this.dragTarget);
            const parentNode = document.getElementById(this.components.container.id)?.parentNode;

            document.getElementById(this.components.container.id)?.remove();
            parentNode.append(renderedList);
            
            event.preventDefault();
        },
        save: function () {
            this.tasksData = [];

            this.tasks.forEach((item) => {
                item.task.retrieveData();
            });

            this.tasksData = this.tasks.map((item) => { 
                return { 
                    id: item.id,
                    task: {
                        description: item.task.description,
                        title: item.task.title,
                        due: item.task.due,
                        completed: item.task.completed,
                    }
                }
            });

            localStorage.setItem('todolist', JSON.stringify({
                    idCounter: this.idCounter, 
                    tasks: this.tasksData
                })
            );
        }
    }
}