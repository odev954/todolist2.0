function Task(description, title, due, completed=false, taskList=null) 
{
    return {
        description: description,
        title: title,
        due: due,
        completed: completed,
        taskList: taskList,
        components: {},
        render: function (classList)
        {
            let container = document.createElement('div');
            let title = TextField(text=this.title, taskList=this.taskList);
            let description = TextField(text=this.description, taskList=this.taskList);
            let due = TextField(text=this.due instanceof Date ? this.due.toDateString() : '', 
                      taskList=this.taskList);
            let statusButton = TaskStatusButton(completed=this.completed, taskList=this.taskList);

            container.setAttribute("draggable", "true");
            container.classList.add(...classList); //style component

            container.addEventListener('click', () => {
                this.components.container.classList.add('pressed');
            });
            
            container.append(
                title.render('h2'), 
                description.render(),
                due.render(),
                statusButton.render(
                    {
                        ongoing: ["status","negative", "text"],
                        done: ["status","positive", "text"],
                    }
                )
            );

            this.components.title = title;
            this.components.description = description;
            this.components.due = due;
            this.components.status = statusButton;
            this.components.container = container;
            
            return this.components.container;
        },
        retrieveData: function() {
            if(this.components.description 
                && this.components.due
                && this.components.title
                && this.components.status)
            {
                this.description = this.components.description.text;
                this.due = new Date(this.components.due.text);
                this.title = this.components.title.text;
                this.completed = this.components.status.completed;
            }
        }
    }
}