function InsertButton(listContainer, todoList)
{
    return {
        todoList: todoList,
        listContainer: listContainer,
        components: {},
        render: function (classList) {
            let button = document.createElement('button');

            button.addEventListener('click', () => {
                let panel = InsertPanel(listContainer, todoList);

                listContainer.append(panel.render(['insert-panel']));
            });
            

            button.classList.add(...classList); //style component

            button.textContent = 'Add new task';

            this.components.button = button;

            return this.components.button;
        }
    }
}