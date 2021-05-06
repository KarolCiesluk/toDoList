{
  const tasks = [
    {
      content: "nagrać lekcję",
      done: false,
    },
    {
      content: "zjeść pierogi",
      done: true,
    },
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;

    render();
  };

  const resetInput = (newTaskElement) => {
    newTaskElement.value = "";
    newTaskElement.focus();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <div class="taskList__item">
            <button class="taskList__button taskList__button--done js-done">${task.done ? "✔️" : ""}</button>
            <li class="taskList__content"
            ${task.done ? " style=\"text-decoration: line-through\"" : ""}
            >
            ${task.content}
            </li>
            <button class="taskList__button taskList__button--remove js-remove">🗑</button>
            </div>
            `
    };

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
    resetInput(newTaskElement);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}