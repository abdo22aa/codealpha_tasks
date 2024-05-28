const todoValue = document.getElementById("todoText"),
  listItems = document.getElementById("listItems"),
  addUpdateClick = document.getElementById("addUpdateClick"),
  alertMsg = document.getElementById("AlertMsg"),
  confirmModal = document.getElementById("confirmModal"),
  confirmBtn = document.getElementById("confirmBtn"),
  cancelBtn = document.getElementById("cancelBtn"),
  confirmText = document.getElementById("confirmText");

let updateText;
let todoData = JSON.parse(localStorage.getItem("todoData"));
let isEditMode = false;
let itemToDelete = null;

if (!todoData) {
  todoData = [];
}

function setLocalStorage() {
  localStorage.setItem("todoData", JSON.stringify(todoData));
}

todoValue.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (isEditMode) {
      updateSelectionItems();
    } else {
      createToDoData();
    }
  }
});

readTodoItems();

function readTodoItems() {
  listItems.innerHTML = ''; // Clear the list to prevent duplication
  console.log(todoData);
  todoData.forEach((element) => {
    let li = document.createElement("li");
    let style = "";
    if (element.status) {
      style = "style='text-decoration: line-through'";
    }
    const todoItems = `<div class="todo-element" ${style} onclick="completeTodoItem(this)">${
      element.item
    }</div>
    <div>${
      !element.status
        ? '<i class="fa-solid fa-pencil edit todo-actions" onclick="updateToDoList(this)"></i>'
        : ""
    }
    <i class="fa-solid fa-trash delete todo-actions" onclick="showConfirmModal(this)"></i>
    </div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}

function createToDoData() {
  if (todoValue.value === "") {
    setAlertMsg("Please Enter Your Todo Text");
    todoValue.focus();
    return;
  }

  let li = document.createElement("li");
  const todoItems = `
    <div class="todo-element" onclick="completeTodoItem(this)">
      ${todoValue.value}
    </div>
    <div>
      <i class="fa-solid fa-pencil edit todo-actions" onclick="updateToDoList(this)"></i>
      <i class="fa-solid fa-trash delete todo-actions" onclick="showConfirmModal(this)" ></i>
    </div>`;

  li.innerHTML = todoItems;
  listItems.appendChild(li);
  if (!todoData) {
    todoData = [];
  }

  let dataItem = { item: todoValue.value, status: false };
  console.log(dataItem);
  todoData.push(dataItem);
  setLocalStorage();

  todoValue.value = "";
  setAlertMsg("Todo item Created Successfully.");
}

function completeTodoItem(e) {
  const todoTextElement = e;
  const todoText = todoTextElement.innerText.trim();
  const todoIndex = todoData.findIndex(item => item.item === todoText);

  if (todoIndex !== -1) {
    const isCompleted = todoData[todoIndex].status;
    todoData[todoIndex].status = !isCompleted;
    todoTextElement.style.textDecoration = isCompleted ? "" : "line-through";

    const editIcon = todoTextElement.nextElementSibling.querySelector(".edit");
    if (editIcon) {
      editIcon.style.display = isCompleted ? "inline" : "none";
    }

    setLocalStorage();
    readTodoItems(); // Refresh the list to update the UI
  }
}

function updateSelectionItems() {
  todoData.forEach((element) => {
    if (element.item == updateText.innerText.trim()) {
      element.item = todoValue.value;
    }
  });
  setLocalStorage();
  todoValue.value = "";

  // Reset the add/update button to add mode
  addUpdateClick.setAttribute("onclick", "createToDoData()");
  addUpdateClick.innerHTML = `<i class="fa-solid fa-plus"></i><span>Add Task</span>`;
  isEditMode = false;
  setAlertMsg("Todo item Updated Successfully.");
  readTodoItems(); // Refresh the list to update the UI
}

function updateToDoList(e) {
  if (
    e.parentElement.parentElement.querySelector("div").style.textDecoration ===
    ""
  ) {
    todoValue.value =
      e.parentElement.parentElement.querySelector("div").innerText;
    addUpdateClick.setAttribute("onclick", "updateSelectionItems()");
    addUpdateClick.innerHTML = `<i class="fa-solid fa-pencil"></i><span>Edit Task</span>`;
    updateText = e.parentElement.parentElement.querySelector("div");
    isEditMode = true;
    return;
  }
}

function showConfirmModal(e) {
  itemToDelete = e;
  confirmText.innerText = `Do you want to delete this item: "${e.parentElement.parentElement.querySelector('div').innerText.trim()}"?`;
  confirmModal.style.display = "flex";
}

confirmBtn.addEventListener("click", () => {
  deleteToDoList(itemToDelete);
  confirmModal.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
  confirmModal.style.display = "none";
});

function deleteToDoList(e) {
  let deleteValue =
    e.parentElement.parentElement.querySelector("div").innerText;
  e.parentElement.parentElement.remove();
  todoValue.focus();

  todoData = todoData.filter((element) => element.item.trim() !== deleteValue.trim());
  setLocalStorage();
  setAlertMsg("Todo item Removed Successfully.");
}

function setAlertMsg(msg){
  alertMsg.removeAttribute("class");
  alertMsg.innerText = msg;

  setTimeout(()=>{
    alertMsg.classList.add("toggleMe");
  },1000)
}
