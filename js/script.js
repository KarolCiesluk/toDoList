{
  let tasks = [];

  let hideDoneTasks = false;

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !task.done } : element);
    render();
  };

  const addNewTask = (newTaskContent) => {
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
          class="tasks__item ${task.done && hideDoneTasks ? "tasks__item--hiden" : ""} js-task" 
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
  };

  const renderButtons = () => {
    let taskListButtonsHTML = "";

    if (tasks.length) {
      taskListButtonsHTML = `
        <button class="section__button js-toggleHideTasks">
          ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="section__button section__button--doneAll js-doneAll" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
          Ukończ wszystkie
        </button>
      `;
    }

    document.querySelector(".js-buttonsContainer").innerHTML = taskListButtonsHTML;
  };

  const toggleHideTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const tickAllTasksDone = () => {
    tasks = tasks.map(task => {
      return { ...task, done: true };
    });
    render();
  };

  const bindButtonsEvents = () => {
    const toggleHideTasksButton = document.querySelector(".js-toggleHideTasks");
    const doneAllButton = document.querySelector(".js-doneAll");

    if (toggleHideTasksButton) {
      toggleHideTasksButton.addEventListener("click", toggleHideTasks);
    }

    if (doneAllButton && !doneAllButton.disabled) {
      doneAllButton.addEventListener("click", tickAllTasksDone);
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
