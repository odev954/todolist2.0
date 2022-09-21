function InsertButton(listContainer, todoList)
{
    return {
        todoList: todoList,
        listContainer: listContainer,
        components: {},
        insertTask:  () => {
            listContainer.append(
                todoList.add(
                    Task('Do something...', 
                        'New Task', 
                        new Date(Date.now()), 
                        completed=false, 
                        taskList=todoList)
                )
            );
        },
        render: function (classList) {
            let button = document.createElement('button');

            button.addEventListener('click', this.insertTask);
            document.addEventListener('keydown', (event) => {
                if(event.key == 'Enter') {
                    this.insertTask();
                }
            })

            button.classList.add(...classList); //style component

            button.textContent = 'Add new task';

            this.components.button = button;

            return this.components.button;
        }
    }
}