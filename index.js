//localStorage.clear();
let todoItemsContainer = document.getElementById("todoItemsContainer");
let addButton = document.getElementById("addBtnId");
let saveButton = document.getElementById("saveBtnId");

function getTodoListFromStrorage() {
    let stringifiedToDo = localStorage.getItem("todoList");
    let parsedToDo = JSON.parse(stringifiedToDo);
    if (parsedToDo === null) {
        return [];
    } else {
        return parsedToDo;
    }
}
let todoList = getTodoListFromStrorage();
saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.log(todoList);
};
console.log(todoList);
let uniqueId = 1;

function onCreateAppend(todo) {
    let checkboxId = "checkboxElement" + todo.uniqueId;
    let listItemElementId = "listItem" + todo.uniqueId;

    let listItemElement = document.createElement("li");
    listItemElement.classList.add("todo-item-container", "d-flex", "flex-row");
    listItemElement.id = listItemElementId;
    todoItemsContainer.appendChild(listItemElement);

    let checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.id = checkboxId;
    checkboxElement.checked = todo.isChecked;
    checkboxElement.classList.add("checkbox-input");
    listItemElement.appendChild(checkboxElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    listItemElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    } else {
        labelElement.classList.remove("checked");
    }
    checkboxElement.onclick = function() {
        labelElement.classList.toggle("checked");
        if (todo.isChecked === true) {
            todo.isChecked = false;
        } else {
            todo.isChecked = true;
        }
    };

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);
    deleteIconContainer.onclick = function() {
        todoItemsContainer.removeChild(listItemElement);
        todoList.pop(uniqueId);
        console.log(todoList);
    }
    uniqueId += 1;
}
for (let each of todoList) {
    each['uniqueId'] = uniqueId;
    onCreateAppend(each);
}

addButton.onclick = function() {
    let userinput = document.getElementById("todoUserInput");
    let userinputVal = userinput.value;

    if (userinputVal === "") {
        alert("Enter Valid Input !!");
        return;
    }
    let newToDo = {
        'text': userinputVal,
        'uniqueId': uniqueId,
        'isChecked': false
    };
    todoList.push(newToDo);
    onCreateAppend(newToDo);
    userinput.value = "";
    console.log(todoList);

};