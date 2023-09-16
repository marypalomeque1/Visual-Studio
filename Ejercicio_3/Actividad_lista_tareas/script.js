
"use strict";

// Variables para mantener un registro de tareas completadas y pendientes
const tareasCompletadas = [];
const tareasPendientes = [];

function mostrarCompletadas() {
    // Oculta todas las tareas
    ocultarTodasLasTareas();

    // Muestra las tareas completadas
    tareasCompletadas.forEach(function(tarea) {
        tarea.style.display = "block";
    });
}

function mostrarPendientes() {
    // Oculta todas las tareas
    ocultarTodasLasTareas();

    // Muestra las tareas pendientes
    tareasPendientes.forEach(function(tarea) {
        tarea.style.display = "block";
    });
}

function agregarTarea() {
    const nuevaTareaInput = document.getElementById("nuevaTarea");
    const listaTareas = document.getElementById("listaTareas");
    const nuevaTareaTexto = nuevaTareaInput.value.trim();

    if (nuevaTareaTexto !== "") {
        const nuevaTarea = document.createElement("li");
        nuevaTarea.textContent = nuevaTareaTexto;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "delete";
        botonEliminar.onclick = function() {
            listaTareas.removeChild(nuevaTarea);
        };

        nuevaTarea.appendChild(botonEliminar);
        listaTareas.appendChild(nuevaTarea);
        nuevaTareaInput.value = "";

        // Agrega la tarea a la lista de tareas pendientes
        tareasPendientes.push(nuevaTarea);
    }
}

function marcarCompletada(tarea) {
    tarea.classList.toggle("completed");

    // Mueve la tarea completada a la lista de tareas completadas
    if (tarea.classList.contains("completed")) {
        tareasCompletadas.push(tarea);
        const index = tareasPendientes.indexOf(tarea);
        if (index > -1) {
            tareasPendientes.splice(index, 1);
        }
    } else {
        // Mueve la tarea pendiente de nuevo a la lista de tareas pendientes
        tareasPendientes.push(tarea);
        const index = tareasCompletadas.indexOf(tarea);
        if (index > -1) {
            tareasCompletadas.splice(index, 1);
        }
    }
}

function ocultarTodasLasTareas() {
    // Oculta todas las tareas
    const todasLasTareas = document.querySelectorAll("#listaTareas li");
    todasLasTareas.forEach(function(tarea) {
        tarea.style.display = "none";
    });
}

// Agregar evento de clic a las tareas para marcarlas como completadas
document.getElementById("listaTareas").addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        marcarCompletada(event.target);
    }
});

// Agregar evento de clic al botón "Agregar"
document.getElementById("agregar").addEventListener("click", agregarTarea);

// Agregar evento de clic al botón "Mostrar Completadas"
document.getElementById("mostrarCompletadas").addEventListener("click", mostrarCompletadas);

// Agregar evento de clic al botón "Mostrar Pendientes"
document.getElementById("mostrarPendientes").addEventListener("click", mostrarPendientes);
