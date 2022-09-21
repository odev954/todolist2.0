function TextField(text='', taskList=null)
{
    return {
        text: text,
        newText: text,
        taskList: taskList,
        components: {},
        render: function(tag='p', classList=[]) {
            let textField = document.createElement(tag);
            
            textField.classList.add(...classList); //style component

            textField.setAttribute('contenteditable', 'true');
            textField.innerHTML = text;

            textField.addEventListener("input", (e) => {
                this.newText = e.target.innerHTML;
            });
            textField.addEventListener('keydown', (event) => {
                if(event.key == 'Tab') {
                    this.text = this.newText;
                    this.components.textField.innerHTML = this.text;
                    this.taskList?.save();
                }
                else if(event.key == 'Escape') {
                    this.newText = this.text;
                    this.components.textField.innerHTML = this.text;
                }
            });
            textField.addEventListener('focusout', () => {
                this.newText = this.text;
                this.components.textField.innerHTML = this.text;
            });
            

            this.components.textField = textField;

            return this.components.textField;
        }
    }
}