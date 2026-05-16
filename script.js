// ========== VARIABLES GLOBALES ==========
let recetas = [];
let recetasSeleccionadas = [];
let nombreUsuario = "";
let recetasActuales = [];

// ========== FUNCIONES ==========

// Función: Iniciar aplicación
async function iniciarApp() {
    verificarNombreGuardado();
    configurarNombre();
    await cargarRecetasDesdeJSON();
    cargarRecetasGuardadas();
    configurarEventos();
}

// Función: Cargar recetas desde archivo JSON
async function cargarRecetasDesdeJSON() {
    const loader = document.getElementById("loader");
    
    try {
        // Mostrar loader
        loader.classList.remove("oculto");
        
        // Simular un pequeño delay para mostrar el loader (opcional)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Cargar archivo JSON
        const response = await fetch('recetas.json');
        
        if (!response.ok) {
            throw new Error('Error al cargar las recetas');
        }
        
        recetas = await response.json();
        recetasActuales = [...recetas];
        
        // Mostrar recetas
        mostrarRecetas(recetas);
        
        // Ocultar loader
        loader.classList.add("oculto");
        
        // Notificación de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Recetas cargadas!',
            text: `Se cargaron ${recetas.length} recetas disponibles`,
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
        
    } catch (error) {
        loader.classList.add("oculto");
        
        Swal.fire({
            icon: 'error',
            title: 'Error al cargar recetas',
            text: 'No se pudieron cargar las recetas. Por favor, recargá la página.',
            confirmButtonText: 'Recargar',
            confirmButtonColor: '#854632'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        });
    }
}

// Función: Verificar si hay nombre guardado
function verificarNombreGuardado() {
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    
    if (nombreGuardado) {
        nombreUsuario = nombreGuardado;
        document.querySelector(".form-nombre").classList.add("oculto");
        document.getElementById("saludoUsuario").classList.remove("oculto");
        document.getElementById("nombreUsuario").textContent = nombreUsuario;
    }
}

// Función: Configurar evento del nombre
function configurarNombre() {
    const btnGuardar = document.getElementById("btnGuardarNombre");
    const inputNombre = document.getElementById("inputNombre");
    
    // Permitir enviar con Enter
    inputNombre.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            btnGuardar.click();
        }
    });
    
    btnGuardar.addEventListener("click", () => {
        nombreUsuario = inputNombre.value.trim();
        
        if (nombreUsuario === "") {
            Swal.fire({
                icon: 'warning',
                title: '¡Ups!',
                text: 'Por favor, ingresá tu nombre para continuar',
                confirmButtonColor: '#854632'
            });
            return;
        }
        
        // Ocultar formulario, mostrar saludo
        document.querySelector(".form-nombre").classList.add("oculto");
        document.getElementById("saludoUsuario").classList.remove("oculto");
        document.getElementById("nombreUsuario").textContent = nombreUsuario;
        
        // Guardar en localStorage
        localStorage.setItem("nombreUsuario", nombreUsuario);
        
        // Notificación de bienvenida
        Swal.fire({
            icon: 'success',
            title: `¡Bienvenido/a, ${nombreUsuario}! 🌱`,
            text: 'Explorá nuestras deliciosas recetas vegetarianas',
            timer: 2500,
            showConfirmButton: false
        });
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
    document.getElementById("inputTiempo").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            aplicarFiltroTiempo();
        }
    });
    
    document.getElementById("inputIngrediente").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            aplicarFiltroIngrediente();
        }
    });
    
    // Cerrar formularios al hacer click fuera
    document.getElementById("formFiltroTiempo").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            cerrarFormularioTiempo();
        }
    });
    
    document.getElementById("formFiltroIngrediente").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
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
    const inputTiempo = document.getElementById("inputTiempo");
    const tiempo = Number(inputTiempo.value);
    
    if (isNaN(tiempo) || tiempo <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Número inválido',
            text: 'Por favor, ingresá un tiempo válido en minutos',
            confirmButtonColor: '#854632'
        });
        return;
    }
    
    const recetasFiltradas = recetas.filter(receta => receta.tiempo <= tiempo);
    
    if (recetasFiltradas.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'No hay recetas disponibles',
            text: `No encontramos recetas que se puedan preparar en ${tiempo} minutos o menos`,
            confirmButtonColor: '#854632'
        });
        return;
    }
    
    mostrarRecetas(recetasFiltradas);
    cerrarFormularioTiempo();
    
    Swal.fire({
        icon: 'success',
        title: '¡Filtro aplicado!',
        text: `Encontramos ${recetasFiltradas.length} receta(s) de hasta ${tiempo} minutos`,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
    });
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
    const inputIngrediente = document.getElementById("inputIngrediente");
    const ingrediente = inputIngrediente.value.trim().toLowerCase();
    
    if (ingrediente === "") {
        Swal.fire({
            icon: 'warning',
            title: '¡Ups!',
            text: 'Por favor, ingresá un ingrediente para buscar',
            confirmButtonColor: '#854632'
        });
        return;
    }
    
    const recetasFiltradas = recetas.filter(receta => 
        receta.ingredientes.some(ing => 
            ing.toLowerCase().includes(ingrediente)
        )
    );
    
    if (recetasFiltradas.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'No hay recetas disponibles',
            text: `No encontramos recetas con "${ingrediente}"`,
            confirmButtonColor: '#854632'
        });
        return;
    }
    
    mostrarRecetas(recetasFiltradas);
    cerrarFormularioIngrediente();
    
    Swal.fire({
        icon: 'success',
        title: '¡Filtro aplicado!',
        text: `Encontramos ${recetasFiltradas.length} receta(s) con ${ingrediente}`,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
    });
}

// Función: Mostrar recetas en el HTML
function mostrarRecetas(listadoRecetas) {
    const contenedor = document.getElementById("recetasDisponibles");
    contenedor.innerHTML = "";
    
    recetasActuales = listadoRecetas;
    
    if (listadoRecetas.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-vacio">No se encontraron recetas</p>';
        return;
    }
    
    listadoRecetas.forEach((receta, index) => {
        // Verificar si ya está seleccionada
        const yaSeleccionada = recetasSeleccionadas.some(r => r.id === receta.id);
        
        const card = document.createElement("div");
        card.className = "receta-card";
        
        // Si tiene imagen, mostrarla
        const imagenHTML = receta.imagen ? 
            `<img src="${receta.imagen}" alt="${receta.nombre}" class="receta-imagen" onerror="this.style.display='none'">` 
            : '';
        
        card.innerHTML = `
            ${imagenHTML}
            <div class="receta-contenido">
                <h3>${receta.nombre}</h3>
                <p class="receta-descripcion">${receta.descripcion || ''}</p>
                <div class="receta-info">
                    <span>⏱️ ${receta.tiempo} min</span>
                    <span>📊 ${receta.dificultad}</span>
                    <span class="badge ${receta.vegano ? 'vegano' : 'no-vegano'}">
                        ${receta.vegano ? '🌱 Vegano' : '🥚 Vegetariano'}
                    </span>
                </div>
                <button 
                    class="btn-agregar" 
                    onclick="agregarReceta(${index})"
                    ${yaSeleccionada ? 'disabled' : ''}>
                    ${yaSeleccionada ? '✓ Ya agregada' : '+ Agregar'}
                </button>
            </div>
        `;
        
        contenedor.appendChild(card);
    });
}

// Función: Agregar receta a la selección
function agregarReceta(indice) {
    const receta = recetasActuales[indice];
    
    // Verificar que no esté ya seleccionada
    const yaEsta = recetasSeleccionadas.some(r => r.id === receta.id);
    
    if (!yaEsta) {
        recetasSeleccionadas.push(receta);
        guardarEnLocalStorage();
        mostrarRecetasSeleccionadas();
        mostrarRecetas(recetasActuales);
        
        Swal.fire({
            icon: 'success',
            title: '¡Receta agregada!',
            text: `${receta.nombre} fue agregada a tu lista`,
            timer: 1500,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
    }
}

// Función: Eliminar receta de la selección
function eliminarReceta(indice) {
    const receta = recetasSeleccionadas[indice];
    
    Swal.fire({
        title: '¿Eliminar receta?',
        text: `¿Querés eliminar "${receta.nombre}" de tu selección?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#854632',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            recetasSeleccionadas.splice(indice, 1);
            guardarEnLocalStorage();
            mostrarRecetasSeleccionadas();
            mostrarRecetas(recetasActuales);
            
            Swal.fire({
                icon: 'success',
                title: 'Receta eliminada',
                timer: 1500,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        }
    });
}

// Función: Mostrar recetas seleccionadas
function mostrarRecetasSeleccionadas() {
    const lista = document.getElementById("listaSeleccionadas");
    const mensajeVacio = document.getElementById("mensajeVacio");
    const resumen = document.getElementById("resumen");
    const btnLimpiar = document.getElementById("btnLimpiarSeleccion");
    
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
    
    recetasSeleccionadas.forEach((receta, index) => {
        tiempoTotal += receta.tiempo;
        
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${receta.nombre}</strong>
                <span style="color: #666;"> - ${receta.tiempo} min</span>
            </div>
            <button class="btn-eliminar" onclick="eliminarReceta(${index})">
                ❌ Eliminar
            </button>
        `;
        
        lista.appendChild(li);
    });
    
    document.getElementById("totalRecetas").textContent = recetasSeleccionadas.length;
    document.getElementById("tiempoTotal").textContent = tiempoTotal;
}

// Función: Mostrar todas las recetas
function mostrarTodas() {
    mostrarRecetas(recetas);
    
    Swal.fire({
        icon: 'info',
        title: 'Mostrando todas las recetas',
        text: `${recetas.length} recetas disponibles`,
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
    });
}

// Función: Limpiar selección
function limpiarSeleccion() {
    Swal.fire({
        title: '¿Limpiar toda la selección?',
        text: 'Se eliminarán todas las recetas seleccionadas',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, limpiar todo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            recetasSeleccionadas = [];
            guardarEnLocalStorage();
            mostrarRecetasSeleccionadas();
            mostrarRecetas(recetasActuales);
            
            Swal.fire({
                icon: 'success',
                title: 'Selección limpiada',
                text: 'Todas las recetas fueron eliminadas',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

// Función: Guardar en LocalStorage
function guardarEnLocalStorage() {
    localStorage.setItem("recetasSeleccionadas", JSON.stringify(recetasSeleccionadas));
}

// Función: Cargar desde LocalStorage
function cargarRecetasGuardadas() {
    const guardadas = localStorage.getItem("recetasSeleccionadas");
    
    if (guardadas) {
        recetasSeleccionadas = JSON.parse(guardadas);
        mostrarRecetasSeleccionadas();
    }
}

// ========== INICIAR APLICACIÓN ==========
iniciarApp();