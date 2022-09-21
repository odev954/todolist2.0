function main()
{
    let container = document.getElementById('test');
    let menu = document.getElementById('menu');
    let list = TaskList();
    let ins = InsertButton(container, list);
    let rmv = RemoveButton(container, list);
    let fltr = FilterButton(container, list);
    let delall = DeleteButton(container, list);
    let delcomp = DeleteButton(container, list, true);
    container.append(list.render(['cards-grid']));
    
    menu.append(ins.render([]));
    menu.append(rmv.render([]));
    menu.append(fltr.render([]));
    menu.append(delall.render([]));
    menu.append(delcomp.render([]));
    
    ins.components.button.addEventListener('click', () => rmv.setupClickEvents());
}

main()