//CONSTANTES Y VARIABLES
const recetas = [
    { 
        nombre: "Hamburguesa de lentejas", 
        tiempo: 30, 
        ingredientes: ["lentejas", "cebolla", "ajo", "pan rallado"],
        dificultad: "Media", 
        vegano: true 
    },
    { 
        nombre: "Pastel de papas", 
        tiempo: 45, 
        ingredientes: ["papas", "queso", "leche", "manteca"],
        dificultad: "Fácil", 
        vegano: false 
    },
    { 
        nombre: "Tacos de garbanzos", 
        tiempo: 20, 
        ingredientes: ["garbanzos", "tortillas", "lechuga", "tomate"],
        dificultad: "Fácil", 
        vegano: true 
    },
    { 
        nombre: "Empanadas de soja", 
        tiempo: 45, 
        ingredientes: ["soja texturizada", "tapas de empanada", "cebolla", "ajo"],
        dificultad: "Fácil", 
        vegano: true 
    },
    { 
        nombre: "tortilla de papas", 
        tiempo: 35, 
        ingredientes: ["papas", "huevos", "cebolla", "queso"],
        dificultad: "Fácil", 
        vegano: false 
    },

];

let recetasSeleccionadas = [];
let nombreUsuario = "";
let recetasActuales = [...recetas];


// ========== FUNCIONES ==========

// Función: Iniciar aplicación
function iniciarApp() {
    solicitarNombre();
    cargarRecetasGuardadas();
    mostrarRecetas(recetas);
    configurarEventos();
}

// Función: Solicitar nombre del usuario
function solicitarNombre() {
    nombreUsuario = prompt("¡Bienvenido/a! ¿Cuál es tu nombre?");
    
    if (!nombreUsuario || nombreUsuario.trim() === "") {
        nombreUsuario = "Usuario";
    }
    
    document.getElementById("nombreUsuario").textContent = nombreUsuario;
}

// Función: Configurar eventos de botones
function configurarEventos() {
    document.getElementById("btnFiltrarTiempo").addEventListener("click", filtrarPorTiempo);
    document.getElementById("btnFiltrarIngrediente").addEventListener("click", filtrarPorIngrediente);
    document.getElementById("btnMostrarTodas").addEventListener("click", mostrarTodas);
    document.getElementById("btnLimpiarSeleccion").addEventListener("click", limpiarSeleccion);
}

// Función: Mostrar recetas en el HTML
function mostrarRecetas(listadoRecetas) {
    let contenedor = document.getElementById("recetasDisponibles");
    contenedor.innerHTML = "";
    
    recetasActuales = listadoRecetas;
    
    for (let i = 0; i < listadoRecetas.length; i++) {
        let receta = listadoRecetas[i];
        
        // Verificar si ya está seleccionada
        let yaSeleccionada = recetasSeleccionadas.some(r => r.nombre === receta.nombre);
        
        let card = document.createElement("div");
        card.className = "receta-card";
        card.innerHTML = `
            <h3>${receta.nombre}</h3>
            <div class="receta-info">
                <span>⏱️ ${receta.tiempo} minutos</span>
                <span>📊 ${receta.dificultad}</span>
                <span class="badge ${receta.vegano ? 'vegano' : 'no-vegano'}">
                    ${receta.vegano ? '🌱 Vegano' : '🥚 Vegetariano'}
                </span>
            </div>
            <button 
                class="btn-agregar" 
                onclick="agregarReceta(${i})"
                ${yaSeleccionada ? 'disabled' : ''}>
                ${yaSeleccionada ? '✓ Ya agregada' : '+ Agregar'}
            </button>
        `;
        
        contenedor.appendChild(card);
    }
}

// Función: Agregar receta a la selección
function agregarReceta(indice) {
    let receta = recetasActuales[indice];
    
    // Verificar que no esté ya seleccionada
    let yaEsta = recetasSeleccionadas.some(r => r.nombre === receta.nombre);
    
    if (!yaEsta) {
        recetasSeleccionadas.push(receta);
        guardarEnLocalStorage();
        mostrarRecetasSeleccionadas();
        mostrarRecetas(recetasActuales); // Refrescar para deshabilitar botón
    }
}

// Función: Eliminar receta de la selección
function eliminarReceta(indice) {
    recetasSeleccionadas.splice(indice, 1);
    guardarEnLocalStorage();
    mostrarRecetasSeleccionadas();
    mostrarRecetas(recetasActuales); // Refrescar botones
}

// Función: Mostrar recetas seleccionadas
function mostrarRecetasSeleccionadas() {
    let lista = document.getElementById("listaSeleccionadas");
    let mensajeVacio = document.getElementById("mensajeVacio");
    let resumen = document.getElementById("resumen");
    let btnLimpiar = document.getElementById("btnLimpiarSeleccion");
    
    lista.innerHTML = "";
    
    if (recetasSeleccionadas.length === 0) {
        mensajeVacio.classList.remove("oculto");
        resumen.classList.add("oculto");
        btnLimpiar.classList.add("oculto");
        return;
    }
    
    mensajeVacio.classList.add("oculto");
    resumen.classList.remove("oculto");
    btnLimpiar.classList.remove("oculto");
    
    let tiempoTotal = 0;
    
    for (let i = 0; i < recetasSeleccionadas.length; i++) {
        let receta = recetasSeleccionadas[i];
        tiempoTotal += receta.tiempo;
        
        let li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${receta.nombre}</strong>
                <span style="color: #666;"> - ${receta.tiempo} min</span>
            </div>
            <button class="btn-eliminar" onclick="eliminarReceta(${i})">
                ❌ Eliminar
            </button>
        `;
        
        lista.appendChild(li);
    }
    
    document.getElementById("totalRecetas").textContent = recetasSeleccionadas.length;
    document.getElementById("tiempoTotal").textContent = tiempoTotal;
}

// Función: Filtrar por tiempo
function filtrarPorTiempo() {
    let tiempo = prompt("¿Cuántos minutos tenés disponibles?");
    tiempo = +tiempo;
    
    if (isNaN(tiempo) || tiempo <= 0) {
        alert("Por favor ingresá un número válido");
        return;
    }
    
    let recetasFiltradas = [];
    
    for (let i = 0; i < recetas.length; i++) {
        if (recetas[i].tiempo <= tiempo) {
            recetasFiltradas.push(recetas[i]);
        }
    }
    
    if (recetasFiltradas.length === 0) {
        alert("No hay recetas que se hagan en " + tiempo + " minutos o menos");
        mostrarRecetas(recetas);
    } else {
        mostrarRecetas(recetasFiltradas);
    }
}

// Función: Filtrar por ingrediente
function filtrarPorIngrediente() {
    let ingrediente = prompt("¿Qué ingrediente tenés?\n(Ej: lentejas, papas, garbanzos)");
    
    if (!ingrediente || ingrediente.trim() === "") {
        return;
    }
    
    ingrediente = ingrediente.toLowerCase().trim();
    
    let recetasFiltradas = [];
    
    for (let i = 0; i < recetas.length; i++) {
        for (let j = 0; j < recetas[i].ingredientes.length; j++) {
            if (recetas[i].ingredientes[j].includes(ingrediente)) {
                recetasFiltradas.push(recetas[i]);
                break;
            }
        }
    }
    
    if (recetasFiltradas.length === 0) {
        alert("No hay recetas con " + ingrediente);
        mostrarRecetas(recetas);
    } else {
        mostrarRecetas(recetasFiltradas);
    }
}

// Función: Mostrar todas las recetas
function mostrarTodas() {
    mostrarRecetas(recetas);
}

// Función: Limpiar selección
function limpiarSeleccion() {
    if (confirm("¿Estás seguro/a de que querés limpiar todas las recetas seleccionadas?")) {
        recetasSeleccionadas = [];
        guardarEnLocalStorage();
        mostrarRecetasSeleccionadas();
        mostrarRecetas(recetasActuales);
    }
}

// Función: Guardar en LocalStorage
function guardarEnLocalStorage() {
    localStorage.setItem("recetasSeleccionadas", JSON.stringify(recetasSeleccionadas));
}

// Función: Cargar desde LocalStorage
function cargarRecetasGuardadas() {
    let guardadas = localStorage.getItem("recetasSeleccionadas");
    
    if (guardadas) {
        recetasSeleccionadas = JSON.parse(guardadas);
        mostrarRecetasSeleccionadas();
    }
}

// ========== INICIAR APLICACIÓN ==========
iniciarApp();