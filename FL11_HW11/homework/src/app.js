const rootNode = document.getElementById('root');
const MAX_TODO_ITEMS_LENGTH = 10;
let activeElement;

function dragStart(e) {
    activeElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragLeave(e) {
    e.stopPropagation();
}

function dragOver(e) {
    e.preventDefault();
    return false;
}

function dragDrop(e) {
    if (activeElement && activeElement !== this) {
        activeElement.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}


function createElement({tag = 'div', innerText, className, id, innerHTML, draggable}) {
    const element = document.createElement(tag);
    if (innerText) {
        const textElem = document.createTextNode(innerText);
        element.appendChild(textElem);
    }

    if (id) {
        element.className = id;
    }

    if (className) {
        element.className = className;
    }
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }

    if (draggable) {
        const attr = document.createAttribute('draggable');
        attr.value = 'true';
        element.setAttributeNode(attr);
    }

    return element;
}


function renderContainer(node) {
    const container = createElement({className: 'container'});
    node.appendChild(container);

    return container;
}


function renderHeader(node) {
    const h1 = createElement({className: 'header', innerText: 'TODO Cat List'});
    node.appendChild(h1);

    return h1;
}

function renderInput(node) {
    const row = createElement({className: 'row'});
    const inputTodo = createElement({id: 'input-todo', tag: 'input'});
    const buttonAdd = createElement({
        tag: 'button',
        id: 'icon-add',
        innerHTML: '<i class="material-icons">add_box</i>'
    });
    row.appendChild(inputTodo);
    row.appendChild(buttonAdd);
    node.appendChild(row);
    buttonAdd.disabled = 'disabled';

    return {inputTodo, buttonAdd};
}

function renderList(node) {
    const list = createElement({id: 'list-todo', tag: 'ul'});
    node.appendChild(list);

    return list;
}

function renderTodo(node, todoText, isComplete = false) {
    const todoWrapper = createElement({className: 'todo', tag: 'li', draggable: true});
    const iconCheckbox = createElement({
        tag: 'button',
        className: 'checkbox',
        innerHTML: isComplete
            ? '<i class="material-icons">check_box</i>'
            : '<i class="material-icons">check_box_outline_blank</i>'
    });
    const todo = createElement({
        tag: 'button',
        className: 'todo-text',
        innerText: todoText
    });
    const iconEdit = createElement({
        tag: 'button',
        className: 'icon-edit',
        innerHTML: '<i class="material-icons">create</i>'
    });
    const iconDelete = createElement({
        tag: 'button',
        className: 'icon-delete',
        innerHTML: '<i class="material-icons">delete</i>'
    });
    iconCheckbox.addEventListener('click', () => {
        iconCheckbox.innerHTML = '<i class="material-icons">check_box</i>';
    });
    iconDelete.addEventListener('click', () => {
        node.removeChild(todoWrapper);
        const message = document.getElementsByClassName('message')[0];
        if (message){
            message.parentElement.removeChild(message);
        }
    });
    iconEdit.addEventListener('click', () => {
        todoWrapper.classList.toggle('hidden');
        const row = createElement({className: 'row'});
        const inputEditTodo = createElement({id: 'input-edit-todo', tag: 'input'});
        const buttonSave = createElement({
            tag: 'button',
            className: 'icon-save',
            innerHTML: '<i class="material-icons">save</i>'
        });
        inputEditTodo.value = todo.innerText;
        inputEditTodo.addEventListener('input', () => {
            buttonSave.disabled = inputEditTodo.value
                ? ''
                : 'disabled';
        });
        row.appendChild(inputEditTodo);
        row.appendChild(buttonSave);
        node.insertBefore(row, todoWrapper);
        buttonSave.addEventListener('click', () => {
            todo.innerHTML = inputEditTodo.value;
            todoWrapper.classList.toggle('hidden');
            node.removeChild(row);

        });
    });
    todoWrapper.appendChild(iconCheckbox);
    todoWrapper.appendChild(todo);
    todoWrapper.appendChild(iconEdit);
    todoWrapper.appendChild(iconDelete);
    node.appendChild(todoWrapper);
    todoWrapper.addEventListener('dragstart', dragStart, true);
    todoWrapper.addEventListener('dragover', dragOver, true);
    todoWrapper.addEventListener('dragleave', dragLeave, true);
    todoWrapper.addEventListener('drop', dragDrop, true);
    return todo;
}

const container = renderContainer(rootNode);
const header = renderHeader(container);
const {inputTodo, buttonAdd} = renderInput(container);
const list = renderList(container);

inputTodo.addEventListener('input', () => {
    buttonAdd.disabled = inputTodo.value
        ? ''
        : 'disabled';
    const todoCollection = document.getElementsByClassName('todo');
    if (todoCollection && todoCollection.length > MAX_TODO_ITEMS_LENGTH) {
        buttonAdd.disabled = 'disabled';
    }
});

buttonAdd.addEventListener('click', () => {
    renderTodo(list, inputTodo.value);
    inputTodo.value = '';
    const todoCollection = document.getElementsByClassName('todo');
    buttonAdd.disabled = 'disabled';
    if (todoCollection.length > MAX_TODO_ITEMS_LENGTH) {
        const message = createElement({className: 'message', innerText: 'Maximum item per list are created'});
        list.appendChild(message);
    }
});
