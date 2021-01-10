// Altera cor de fundo do item da lista selecionado
function highlight(event) {
  const clickedItem = event.target;
  const selectedTasks = document.querySelectorAll('.selected');
  if (selectedTasks.length < 1) {
    clickedItem.classList.add('selected');
  } else if (selectedTasks[0] !== clickedItem) {
    selectedTasks[0].classList.remove('selected');
    clickedItem.classList.add('selected');
  } else {
    clickedItem.classList.remove('selected');
  }
}

function highlightListItemEvent() {
  const listItems = document.querySelectorAll('.task');
  for (let index = 0; index < listItems.length; index += 1) {
    listItems[index].removeEventListener('click', highlight);
    listItems[index].addEventListener('click', highlight);
  }
}

// Risca tarefas já completadas
function crossOrUncross(event) {
  const task = event.target;
  task.classList.toggle('completed');
}

function crossTask() {
  const tasks = document.querySelectorAll('.task');
  for (let index = 0; index < tasks.length; index += 1) {
    tasks[index].removeEventListener('dblclick', crossOrUncross);
    tasks[index].addEventListener('dblclick', crossOrUncross);
  }
}

function createListItem(task, className) {
  const taskList = document.querySelector('#lista-tarefas');
  const listItem = document.createElement('li');
  const listItemSpan = document.createElement('span');
  listItemSpan.innerText = task;
  listItemSpan.className = className;
  listItem.appendChild(listItemSpan);
  taskList.appendChild(listItem);
  highlightListItemEvent();
  crossTask();
  document.querySelector('#texto-tarefa').value = '';
}

window.onload = function () {
  /*
  Irá verificar se existe algo no localStorage.
  Se houver, ir criar a lista.
  Senão segue o baile.
  */

  if (localStorage.length > 0) {
    const taskArray = JSON.parse(localStorage.getItem('taskListNames'));
    const classArray = JSON.parse(localStorage.getItem('taskListClasses'));
    const taskList = document.querySelector('#lista-tarefas');
    for (let index = 0; index < taskArray.length; index += 1) {
      createListItem(taskArray[index], classArray[index]);
    }
  }
};

// Adicionar tarefas a lista ordenada #lista-tarefas

function transferText(task) {
  if (task === '') {
    alert('Campo vazio!');
  } else {
    createListItem(task, 'task');
  }
}
function addTask() {
  // Adicionar com clique
  const addButton = document.querySelector('#criar-tarefa');
  const inputBox = document.querySelector('#texto-tarefa');
  addButton.addEventListener('click', function () {
    transferText(inputBox.value);
  });
  // Adicionar com enter
  inputBox.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      transferText(inputBox.value);
    }
  });
}

addTask();

// Botão de limpar lista #apaga-tudo

function clearAll() {
  const clearButton = document.querySelector('#apaga-tudo');
  clearButton.addEventListener('click', function () {
    const taskList = document.querySelector('#lista-tarefas');
    const task = document.querySelectorAll('.task');
    for (let index = 0; index < task.length; index += 1) {
      taskList.removeChild(task[index].parentNode);
    }
    // Garante que, ao limpar a lista, ela não seja carregada novamente em uma nova sessão.
    if (localStorage.length > 0) {
      localStorage.clear();
    }
  });
}

clearAll();

// Botão de remover finalizados #remover-finalizados

function clearDoneItems() {
  const removeDoneButton = document.querySelector('#remover-finalizados');
  removeDoneButton.addEventListener('click', function () {
    const taskList = document.querySelector('#lista-tarefas');
    const task = document.querySelectorAll('.task');
    for (let index = 0; index < task.length; index += 1) {
      if (task[index].className.includes('completed')) {
        taskList.removeChild(task[index].parentNode);
      }
    }
  });
}

clearDoneItems();

// Botão de remover tarefa selecionada #remover-selecionado

function clearselectedItems() {
  const removeSelectedButton = document.querySelector('#remover-selecionado');
  removeSelectedButton.addEventListener('click', function () {
    const taskList = document.querySelector('#lista-tarefas');
    const task = document.querySelectorAll('.task');
    for (let index = 0; index < task.length; index += 1) {
      if (task[index].className.includes('selected')) {
        taskList.removeChild(task[index].parentNode);
      }
    }
  });
}

clearselectedItems();

// Botão de mover tarefa para a posição acima

function moveUp() {
  const moveUpButton = document.querySelector('#mover-cima');
  moveUpButton.addEventListener('click', function () {
    const task = document.querySelectorAll('.task');
    for (let index = 0; index < task.length; index += 1) {
      if (task[index].className.includes('selected') && task[index].parentNode.previousSibling !== null) {
        task[index].parentNode.parentNode.insertBefore(task[index].parentNode, task[index - 1].parentNode);
      }
    }
  });
}

moveUp();

// Botão de mover tarefa para posição abaixo

function moveDown() {
  const moveDownButton = document.querySelector('#mover-baixo');
  moveDownButton.addEventListener('click', function () {
    const task = document.querySelectorAll('.task');
    for (let index = 0; index < task.length; index += 1) {
      if (task[index].className.includes('selected') && task[index].parentNode.nextSibling !== null) {
        task[index].parentNode.parentNode.insertBefore(task[index + 1].parentNode, task[index].parentNode);
      }
    }
  });
}

moveDown();

// Botão de salvar tarefas

function saveTasks() {
  const saveTasksButton = document.querySelector('#salvar-tarefas');
  saveTasksButton.addEventListener('click', function () {
    const task = document.querySelectorAll('.task');
    if (task.length > 0) {
      const taskArray = [];
      const classArray = [];
      for (let index = 0; index < task.length; index += 1) {
        taskArray.push(task[index].innerText);
        classArray.push(task[index].className);
      }
      localStorage.setItem('taskListNames', JSON.stringify(taskArray));
      localStorage.setItem('taskListClasses', JSON.stringify(classArray));
      alert('Lista salva com sucesso!');
    } else {
      alert('Lista de tarefas vazia!')
    }
  });
}

saveTasks();

// Links do Github e do LinkedIn
function socialMediaLink() {
  const githubIcon = document.querySelector('.fa-github');
  githubIcon.addEventListener('click', function () {
    window.open('https://github.com/rach-vp', '_blank');
  });
  const linkedinIcon = document.querySelector('.fa-linkedin');
  linkedinIcon.addEventListener('click', function () {
    window.open('https://www.linkedin.com/in/raquel-pican%C3%A7o-384736107/', '_blank');
  });
}

socialMediaLink();
