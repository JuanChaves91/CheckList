document.addEventListener("DOMContentLoaded", function () {
  const checklist = document.getElementById("checklist");
  const newTaskInput = document.getElementById("newTask");
  const addTaskButton = document.getElementById("addTask");
  const clearTasksButton = document.getElementById("clearTasks");

  addTaskButton.addEventListener("click", function () {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox"><span>${taskText}</span>`;
      checklist.appendChild(li);
      newTaskInput.value = "";
      saveTasks();
    }
  });

  clearTasksButton.addEventListener("click", function () {
    checklist.innerHTML = "";
    saveTasks();
  });

  checklist.addEventListener("change", function () {
    saveTasks();
  });

  function saveTasks() {
    const tasks = [];
    checklist.querySelectorAll("li").forEach((li) => {
      tasks.push({
        text: li.querySelector("span").innerText,
        completed: li.querySelector("input[type='checkbox']").checked,
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" ${
        task.completed ? "checked" : ""
      }><span>${task.text}</span>`;
      checklist.appendChild(li);
    });
  }

  loadTasks();
});