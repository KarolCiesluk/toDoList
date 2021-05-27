{
  let tasks = []; // changed const to let

  let hideDoneTasks = false; // use it for hiding done tasks

  const removeTask = (taskIndex) => {
    // tasks.splice(taskIndex, 1); // immutability required
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  // const toggleAllTasksDone = () => {}; write code here (with map)

  const toggleTaskDone = (taskIndex) => {
    // tasks[taskIndex].done = !tasks[taskIndex].done; // immutability required
    // tasks = tasks.map(...) hint from Krzysiek
    tasks[taskIndex] = { ...tasks[taskIndex], done: tasks[taskIndex].done ? false : true };
    render();
  };

  const addNewTask = (newTaskContent) => {
    // tasks.push({ content: newTaskContent }); // immutability required
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
      tasksListHTMLContent += `
        <li
          class="tasks__item js-task"
        >
          <button class="tasks__button tasks__button--toggleDone js-toggleDone">
            ${task.done ? "&check;" : ""}
          </button>
          <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
            ${task.content}
          </span>
          <button class="tasks__button tasks__button--remove js-remove">
            🗑️
          </button>
        </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
  }; // write code here

  // const renderButtons = () => {}; // write code here; renderuje dwa przyciski

  // const bindButtonsEvents = () => {}; // napisz listenery do przycisków; 
                                      // UWAGA! przysisku ukończ zad może nie być: potrzebny if przysisk się przypiął

  const render = () => {
    renderTasks();
    // renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    // bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = ""; // immutability required???
    }

    newTaskElement.focus();
  };

  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
