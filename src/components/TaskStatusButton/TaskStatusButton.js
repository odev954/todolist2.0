function TaskStatusButton(completed, taskList=null)
{
    return {
        completed: completed,
        components: {},
        styles: {},
        taskList: taskList,
        render: function (styles) {
            let classList = styles[this.completed ? 'done' : 'ongoing']; //select style
            let button = document.createElement('button');

            button.addEventListener('click', (e) => {
                let classList = this.styles[!this.completed ? 'done' : 'ongoing'];
                
                this.completed = !this.completed;
    
                this.components.button.classList = ''; //clear styles
                this.components.button.classList.add(...classList);
    
                this.components.button.textContent = !this.completed ? 'mark as done' : 'mark as ongoing';
                this.taskList.save();
            });

            button.classList.add(...classList); //style component

            button.textContent = !this.completed ? 'mark as done' : 'mark as ongoing';

            this.components.button = button;
            this.styles = styles;

            return this.components.button;
        }
    }
}