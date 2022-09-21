function FilterButton(listContainer, todoList)
{
    return {
        switchToCompleted: true,
        todoList: todoList,
        listContainer: listContainer,
        components: {},
        render: function (classList) {
            let button = document.createElement('button');

            button.addEventListener('click', (e) => {
                listContainer.append(
                    todoList.filter((task) => task.completed === this.switchToCompleted)
                );
                this.switchToCompleted = !this.switchToCompleted;
                this.components.button.textContent = this.switchToCompleted ? 
                    'Show completed tasks' : 'Show ongoing tasks';
            });

            button.classList.add(...classList); //style component

            button.textContent = this.switchToCompleted ? 'Show completed tasks' : 'Show ongoing tasks';

            this.components.button = button;

            return this.components.button;
        }
    }
}