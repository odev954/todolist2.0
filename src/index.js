function main()
{
    let container = document.getElementById('test');
    let menu = document.getElementById('menu');
    let test1 = Task('testing this shit', 'test1', new Date(Date.now()));
    let test2 = Task('testing this shit', 'test2', new Date(Date.now()));
    let test3 = Task('testing this shit', 'test3', new Date(Date.now()));
    let list = TaskList();
    let ins = InsertButton(container, list, () => rmv.setupClickEvents());
    let rmv = RemoveButton(container, list);
    container.append(list.render(['cards-grid']));
    
    list.add(test1);
    list.add(test2);
    let element = list.add(test3);
    
   
    container.append(element);
    menu.append(ins.render([]));
    menu.append(rmv.render([]));    
}

main()