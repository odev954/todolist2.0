function DeleteButton(listContainer, todoList, deleteOnlyCompleted=false)
{
    return {
        deleteOnlyCompleted: deleteOnlyCompleted,
        todoList: todoList,
        listContainer: listContainer,
        components: {},
        render: function (classList) {
            let button = document.createElement('button');

            button.addEventListener('click', (e) => {
                listContainer.append(
                    todoList.delete((task) => this.deleteOnlyCompleted ? task.completed : true)
                );
            });

            button.classList.add(...classList); //style component

            button.textContent = 'Delete ' + (this.deleteOnlyCompleted ? 'completed' : 'all') + ' tasks';

            this.components.button = button;

            return this.components.button;
        }
    }
}