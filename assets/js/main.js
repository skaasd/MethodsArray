const tareas = [
  { id: "124124124", nombre: "Tarea1", realizada: false },
  { id: "122124124", nombre: "Tarea5", realizada: false },
  { id: "124124424", nombre: "Tarea2", realizada: false },
  { id: "124224124", nombre: "Tarea3", realizada: false },
];

const inputTarea = document.querySelector("#inputTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const tbody = document.querySelector("tbody");
const totalTareas = document.querySelector("#totalTareas");
const totalRealizadas = document.querySelector("#totalRealizadas");
// const variable = document.querySelector("#");
// const variable = document.querySelector("#");

//render
const render = (lista = tareas) => {
  tbody.innerHTML = lista
    .map(
      (tarea) => `
<tr>
    <td>${tarea.id}</td>
    <td>${tarea.nombre}</td>
    <td><input type="checkbox" class="check-tarea" data-id="${tarea.id}" ${
        tarea.realizada ? "checked" : ""
      }></td>
    <td> <button type="button" class="btn-borrar" data-id="${
      tarea.id
    }">x</button></td>
</tr>
`
    )
    .join("");
  //cuuenta total
  totalTareas.textContent = tareas.length;
  totalRealizadas.textContent = tareas.filter(
    (tarea) => tarea.realizada
  ).length;
};

render();

//agregar
btnAgregar.addEventListener("click", () => {
  const nuevaTarea = inputTarea.value.trim();
  if (!nuevaTarea) return;
  tareas.push({ id: String(Date.now()), nombre: nuevaTarea, realizada: false });
  inputTarea.value = "";
  render();
});

// eliminar
tbody.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-borrar");
  if (!btn) return;
  const id = btn.dataset.id;
  const eliminarTarea = tareas.findIndex((tarea) => tarea.id === id);
  if (eliminarTarea !== -1) {
    tareas.splice(eliminarTarea, 1);
    render();
  }
});

//Marcar realizadas
tbody.addEventListener("change", (e) => {
  const chk = e.target.closest(".check-tarea");
  if (!chk) return;
  const id = chk.dataset.id;
  const checkear = tareas.find((tarea) => tarea.id === id);
  if (checkear) {
    checkear.realizada = chk.checked;
    render();
  }
});
