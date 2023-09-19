todos = [];
const RENDER_EVENT = "render-todo";
const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    addTodo();
  });
  
  if (availableCheck()) {
    loadDataFromStorage()
  }
});

function addTodo() {
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  const generateId = generateID();
  const todoObject = generateTodoObject(generateId, textTodo, timestamp, false);
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  savedata()
}

function generateID() {
  return +new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted,
  };
}

document.addEventListener(RENDER_EVENT, () => {
  console.log(todos);

  const uncompletedTODOList = document.getElementById("todos");
  uncompletedTODOList.innerHTML = "";
  
  const completedTODOList = document.getElementById('completed-todos')
  completedTODOList.innerHTML = ''

  for (const todo of todos) {
    const todoElement = makeTodo(todo);
    if (!todo.isCompleted) {
      uncompletedTODOList.append(todoElement)
    } else {
      completedTODOList.append(todoElement)
    }
  }
});

function makeTodo(todoObject) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = todoObject.task;

  const timeTitle = document.createElement("p");
  timeTitle.innerText = todoObject.timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, timeTitle);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `todo-${todoObject.id}`);

  if (todoObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", () => {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", () => {
      removeTaskFromCompleted(todoObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", () => {
      addTaskToCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  return container;
}

function findTodo(todoId) {
  for (const itemTodo of todos) {
    if (itemTodo.id === todoId) {
      return itemTodo;
    }
  }

  return null;
}

function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  savedata()
}

function todoIndex(todoId) {
  for (const index of todos) {
    if (todos[index].id === todos) {
      return index
    }
  }
  return -1
}

function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId)
  
  if (todoTarget ==  null ) return
  
  todoTarget.isCompleted = false
  document.dispatchEvent(new Event(RENDER_EVENT))
  savedata()
}

function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId)
  
  if (todoTarget === -1) return
  
  todos.splice(todoTarget, 1)
  document.dispatchEvent(new Event(RENDER_EVENT))
  savedata()
}

function availableCheck() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function savedata() {
  if (availableCheck()) {
    const parse = JSON.stringify(todos)
    localStorage.setItem(STORAGE_KEY, parse)
    document.dispatchEvent(new Event(SAVED_EVENT))
  }
}

document.addEventListener(SAVED_EVENT, () => {
  const saveData = localStorage.getItem(STORAGE_KEY)
  if (saveData) {
    showToast("Data berhasil disimpan")
  }
})

function showToast(message) {
  const toast = document.getElementById('toast')
  toast.textContent = message
  toast.style.opacity = 1
  
  setTimeout(() => {
    toast.style.opacity = 0
  }, 2000)
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
  
  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }
  
  document.dispatchEvent(new Event(RENDER_EVENT));
}