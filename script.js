//CONSTANTES Y VARIABLES
const recetas = [
    { 
        nombre: "Hamburguesa de lentejas", 
        tiempo: 30, 
        ingredientes: ["lentejas", "cebolla", "ajo", "pan rallado"],
        dificultad: "Media", 
        vegano: true,
        imagen: "assets/hamburguesa-lentejas.jpg"
    },
    { 
        nombre: "Pastel de papas", 
        tiempo: 45, 
        ingredientes: ["papas", "queso", "leche", "manteca"],
        dificultad: "Fácil", 
        vegano: false,
        imagen: "assets/pastel-de-papa.jpg"
    },
    { 
        nombre: "Hummus de garbanzos", 
        tiempo: 15, 
        ingredientes: ["garbanzos", "tahini", "limón", "ajo"],
        dificultad: "Fácil", 
        vegano: true,
        imagen: "assets/hummus.jpg"
    },
    { 
        nombre: "Empanadas de soja", 
        tiempo: 45, 
        ingredientes: ["soja texturizada", "tapas de empanada", "cebolla", "ajo"],
        dificultad: "Fácil", 
        vegano: true,
        imagen: "assets/empanadas.jpg"
    },
    { 
        nombre: "Tortilla de papas", 
        tiempo: 35, 
        ingredientes: ["papas", "huevos", "cebolla", "queso"],
        dificultad: "Fácil", 
        vegano: false,
        imagen: "assets/tortilla-papas.jpg"
    }
];

let recetasSeleccionadas = [];
let nombreUsuario = "";
let recetasActuales = [...recetas];

// ========== FUNCIONES ==========

// Función: Iniciar aplicación
function iniciarApp() {
    verificarNombreGuardado();
    configurarNombre();
    cargarRecetasGuardadas();
    mostrarRecetas(recetas);
    configurarEventos();
}

// Función: Verificar si hay nombre guardado
function verificarNombreGuardado() {
    let nombreGuardado = localStorage.getItem("nombreUsuario");
    
    if (nombreGuardado) {
        nombreUsuario = nombreGuardado;
        document.querySelector(".form-nombre").classList.add("oculto");
        document.getElementById("saludoUsuario").classList.remove("oculto");
        document.getElementById("nombreUsuario").textContent = nombreUsuario;
    }
}

// Función: Configurar evento del nombre
function configurarNombre() {
    let btnGuardar = document.getElementById("btnGuardarNombre");
    let inputNombre = document.getElementById("inputNombre");
    
    // Permitir enviar con Enter
    inputNombre.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            btnGuardar.click();
        }
    });
    
    btnGuardar.addEventListener("click", function() {
        nombreUsuario = inputNombre.value.trim();
        
        if (nombreUsuario === "") {
            inputNombre.style.borderColor = "#e53935";
            inputNombre.placeholder = "¡No olvides tu nombre!";
            return;
        }
        
        // Ocultar formulario, mostrar saludo
        document.querySelector(".form-nombre").classList.add("oculto");
        document.getElementById("saludoUsuario").classList.remove("oculto");
        document.getElementById("nombreUsuario").textContent = nombreUsuario;
        
        // Guardar en localStorage
        localStorage.setItem("nombreUsuario", nombreUsuario);
    });
}

// Función: Configurar eventos de botones
function configurarEventos() {
    // Botones principales de filtro
    document.getElementById("btnFiltrarTiempo").addEventListener("click", mostrarFormularioTiempo);
    document.getElementById("btnFiltrarIngrediente").addEventListener("click", mostrarFormularioIngrediente);
    document.getElementById("btnMostrarTodas").addEventListener("click", mostrarTodas);
    document.getElementById("btnLimpiarSeleccion").addEventListener("click", limpiarSeleccion);
    
    // Botones del formulario de tiempo
    document.getElementById("btnAplicarTiempo").addEventListener("click", aplicarFiltroTiempo);
    document.getElementById("btnCancelarTiempo").addEventListener("click", cerrarFormularioTiempo);
    
    // Botones del formulario de ingrediente
    document.getElementById("btnAplicarIngrediente").addEventListener("click", aplicarFiltroIngrediente);
    document.getElementById("btnCancelarIngrediente").addEventListener("click", cerrarFormularioIngrediente);
    
    // Permitir enviar con Enter
    document.getElementById("inputTiempo").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            aplicarFiltroTiempo();
        }
    });
    
    document.getElementById("inputIngrediente").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            aplicarFiltroIngrediente();
        }
    });
    
    // Cerrar formularios al hacer click fuera
    document.getElementById("formFiltroTiempo").addEventListener("click", function(e) {
        if (e.target === this) {
            cerrarFormularioTiempo();
        }
    });
    
    document.getElementById("formFiltroIngrediente").addEventListener("click", function(e) {
        if (e.target === this) {
            cerrarFormularioIngrediente();
        }
    });
}

// Función: Mostrar formulario de tiempo
function mostrarFormularioTiempo() {
    document.getElementById("formFiltroTiempo").classList.remove("oculto");
    document.getElementById("inputTiempo").focus();
}

// Función: Cerrar formulario de tiempo
function cerrarFormularioTiempo() {
    document.getElementById("formFiltroTiempo").classList.add("oculto");
    document.getElementById("inputTiempo").value = "";
}

// Función: Aplicar filtro por tiempo
function aplicarFiltroTiempo() {
    let inputTiempo = document.getElementById("inputTiempo");
    let tiempo = +inputTiempo.value;
    
    if (isNaN(tiempo) || tiempo <= 0) {
        inputTiempo.style.borderColor = "#e53935";
        inputTiempo.placeholder = "¡Ingresá un número válido!";
        return;
    }
    
    let recetasFiltradas = [];
    
    for (let i = 0; i < recetas.length; i++) {
        if (recetas[i].tiempo <= tiempo) {
            recetasFiltradas.push(recetas[i]);
        }
    }
    
    if (recetasFiltradas.length === 0) {
        inputTiempo.style.borderColor = "#ff9800";
        inputTiempo.value = "";
        inputTiempo.placeholder = "No hay recetas en " + tiempo + " min";
        setTimeout(function() {
            inputTiempo.placeholder = "Ej: 30";
            inputTiempo.style.borderColor = "";
        }, 2000);
        return;
    }
    
    mostrarRecetas(recetasFiltradas);
    cerrarFormularioTiempo();
}

// Función: Mostrar formulario de ingrediente
function mostrarFormularioIngrediente() {
    document.getElementById("formFiltroIngrediente").classList.remove("oculto");
    document.getElementById("inputIngrediente").focus();
}

// Función: Cerrar formulario de ingrediente
function cerrarFormularioIngrediente() {
    document.getElementById("formFiltroIngrediente").classList.add("oculto");
    document.getElementById("inputIngrediente").value = "";
}

// Función: Aplicar filtro por ingrediente
function aplicarFiltroIngrediente() {
    let inputIngrediente = document.getElementById("inputIngrediente");
    let ingrediente = inputIngrediente.value.trim().toLowerCase();
    
    if (ingrediente === "") {
        inputIngrediente.style.borderColor = "#e53935";
        inputIngrediente.placeholder = "¡Ingresá un ingrediente!";
        return;
    }
    
    let recetasFiltradas = [];
    
    for (let i = 0; i < recetas.length; i++) {
        for (let j = 0; j < recetas[i].ingredientes.length; j++) {
            if (recetas[i].ingredientes[j].toLowerCase().includes(ingrediente)) {
                recetasFiltradas.push(recetas[i]);
                break;
            }
        }
    }
    
    if (recetasFiltradas.length === 0) {
        inputIngrediente.style.borderColor = "#ff9800";
        inputIngrediente.value = "";
        inputIngrediente.placeholder = "No hay recetas con " + ingrediente;
        setTimeout(function() {
            inputIngrediente.placeholder = "Ej: lentejas, papas, garbanzos";
            inputIngrediente.style.borderColor = "";
        }, 2000);
        return;
    }
    
    mostrarRecetas(recetasFiltradas);
    cerrarFormularioIngrediente();
}

// Función: Mostrar recetas en el HTML
function mostrarRecetas(listadoRecetas) {
    let contenedor = document.getElementById("recetasDisponibles");
    contenedor.innerHTML = "";
    
    recetasActuales = listadoRecetas;
    
    if (listadoRecetas.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-vacio">No se encontraron recetas</p>';
        return;
    }
    
    for (let i = 0; i < listadoRecetas.length; i++) {
        let receta = listadoRecetas[i];
        
        // Verificar si ya está seleccionada
        let yaSeleccionada = recetasSeleccionadas.some(r => r.nombre === receta.nombre);
        
        let card = document.createElement("div");
        card.className = "receta-card";
        
        // Si tiene imagen, mostrarla
        let imagenHTML = receta.imagen ? 
            `<img src="${receta.imagen}" alt="${receta.nombre}" class="receta-imagen" onerror="this.style.display='none'">` 
            : '';
        
        card.innerHTML = `
            ${imagenHTML}
            <div class="receta-contenido">
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
            </div>
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

// Función: Mostrar todas las recetas
function mostrarTodas() {
    mostrarRecetas(recetas);
}

// Función: Limpiar selección
function limpiarSeleccion() {
    // Crear confirmación personalizada en vez de confirm()
    let confirmar = true; // Por ahora dejamos true, pero podrías hacer un modal personalizado
    
    if (confirmar) {
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