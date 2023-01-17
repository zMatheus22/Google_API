const tbody = document.querySelector("tbody");
const addFrom = document.querySelector(".add-form");

const inputData = document.getElementById("data");
const inputModel = document.getElementById("model");
const inputQuantity = document.getElementById("quantity");
const inputPlate = document.getElementById("plate");

const fetchTasks = async () => {
  const response = await fetch("http://localhost:3333/");
  const tasks = await response.json();

  return tasks;
};

const addTask = async (event) => {
  event.preventDefault();

  const task = {
    data: inputData.value,
    model: inputModel.value,
    quantity: inputQuantity.value,
    plate: inputPlate.value,
  };

  await fetch("http://localhost:3333/", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  console.log(JSON.stringify(task));
  loadTasks();
  inputData.value = "";
  inputModel.value = "";
  inputQuantity.value = "";
  inputPlate.value = "";
};

const createElement = (tag, innerText = "", innerHtml = "") => {
  const element = document.createElement(tag);
  if (innerText) {
    element.innerText = innerText;
  }
  if (innerHtml) {
    element.innerHTML = innerHtml;
  }

  return element;
};

const createSelect = (value) => {
  const options = `
        <option value="Alex">Alex</option>
        <option value="Lucas">Lucas</option>
        <option value="Matheus">Matheus</option>
    `;

  const select = createElement("select", "", options);

  select.value = value;
  return select;
};

// Testar
// const task = {
//   id: 1,
//   data: "16 de janeiro de 2023 21:55",
//   model: "Criando o controle de Estoque",
//   quantity: 1,
//   plate: "BRS-2023",
//   mechanic: "Matheus",
// };

const createRow = (task) => {
  const { id, data, model, quantity, plate, mechanic } = task;
  const tr = createElement("tr");
  const tdData = createElement("td", data);
  const tdModel = createElement("td", model);
  const tdQuantity = createElement("td", quantity);
  const tdPlate = createElement("td", plate);

  const tdStatus = createElement("td");
  const tdActions = createElement("td");

  const select = createSelect(mechanic);

  const editButton = createElement(
    "button",
    "",
    `<span class="material-symbols-outlined"> edit </span>`
  );

  editButton.classList.add("btn-actions");

  const deleteButton = createElement(
    "button",
    "",
    `<span class="material-symbols-outlined"> delete </span>`
  );

  deleteButton.classList.add("btn-actions");

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdData);
  tr.appendChild(tdModel);
  tr.appendChild(tdQuantity);
  tr.appendChild(tdPlate);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
};

const loadTasks = async () => {
  const tasks = await fetchTasks();

  tbody.innerHTML = "";

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
};

addFrom.addEventListener("submit", addTask);
loadTasks();
