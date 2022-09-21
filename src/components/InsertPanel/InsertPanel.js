function InsertPanel(listContainer, taskList)
{
    return {
        taskList: taskList,
        components: {},
        render: function (classList)
        {
            let container = document.createElement('div');
            let title = TextField(text='', taskList=this.taskList);
            let description = TextField(text='', taskList=this.taskList);
            let titleCaption = document.createElement('h2');
            let descriptionCaption = document.createElement('h2');
            let sectionCaption = document.createElement('h1');

            container.classList.add(...classList); //style component

            titleCaption.innerHTML = 'Title:';
            descriptionCaption.innerHTML = 'Description:';
            sectionCaption.innerHTML = 'Open New Task';

            container.addEventListener('keydown', (event) => {
                if(event.key == 'Enter') {
                    listContainer.append(
                        this.taskList.add(
                            Task(this.components.description.text, 
                                this.components.title.text, 
                                new Date(Date.now()), 
                                completed=false, 
                                taskList=this.taskList)
                        )
                    );
                    this.components.container.remove();
                }
                else if(event.key == 'Escape') {
                    this.components.container.remove();
                }
            });
            
            container.append(
                sectionCaption,
                titleCaption,
                title.render(),
                descriptionCaption, 
                description.render(),
            );

            this.components.title = title;
            this.components.description = description;
            this.components.container = container;
            
            return this.components.container;
        }
    }
}