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


//FUNCIONES

function solicitarDatosUsuario() {
    nombreUsuario = prompt("¡Bienvenido al simulador de recetas vegetarianas!\n¿Cuál es tu nombre?");
    
    console.log("  BIENVENIDO AL SIMULADOR DE RECETAS VEGETARIANAS");
    console.log("\nHola " + nombreUsuario + ", ¡empecemos a buscar recetas perfectas para vos!\n");
    
    alert("Hola " + nombreUsuario + ", ¡empecemos a buscar recetas perfectas para vos!");
}


function elegirTipoFiltro() {

    console.log("¿CÓMO QUERÉS BUSCAR RECETAS?");
    console.log("1. Por tiempo disponible");
    console.log("2. Por ingredientes que tenés");
    
    let mensaje = "¿Cómo querés buscar recetas?\n\n1. Por tiempo disponible\n2. Por ingredientes que tenés\n\nElegí una opción:";
    let opcion = prompt(mensaje);
    opcion = +opcion; // Convierte a número
    
    console.log("Opción elegida: " + opcion + "\n");
    
    if (opcion === 1) {
        return filtrarPorTiempo();
    } else if (opcion === 2) {
        return filtrarPorIngredientes();
    } else {
        console.log("Opción inválida. Mostrando todas las recetas.\n");
        return recetas;
    }
}

function filtrarPorTiempo() {
    let tiempoDisponible = prompt("¿Cuántos minutos tenés disponibles?");
    tiempoDisponible = +tiempoDisponible;
    
    console.log("RECETAS QUE SE HACEN EN " + tiempoDisponible + " MINUTOS O MENOS\n");
    
    let recetasFiltradas = []; //array vacío para guardar las recetas que cumplan con el tiempo
    
    //ciclo FOR:
    for (let i = 0; i < recetas.length/*Seguí mientras i sea menor que la cantidad total de recetas */; i++) {
        if (recetas[i].tiempo <= tiempoDisponible) {
            recetasFiltradas.push(recetas[i]); //agregar esta receta al array de recetas filtradas
            console.log(recetas[i].nombre + " (" + recetas[i].tiempo + " min)");
        }
    }
    
    if (recetasFiltradas.length === 0) {
        console.log("No hay recetas que se hagan en " + tiempoDisponible + " minutos o menos.");
        console.log("Mostrando todas las opciones.\n");
        return recetas;
    }
    
    console.log("\n");
    return recetasFiltradas;
}

function filtrarPorIngredientes() {
    let ingrediente = prompt("¿Qué ingrediente tenés?\n(Ej: lentejas, papas, garbanzos)");
    ingrediente = ingrediente.toLowerCase();
    
    console.log("RECETAS CON " + ingrediente + " \n");
    
    let recetasFiltradas = [];
    
    for (let i = 0; i < recetas.length; i++) {
        let tieneIngrediente = false;
        
        for (let j = 0; j < recetas[i].ingredientes.length; j++) {
            if (recetas[i].ingredientes[j] === ingrediente) {
                tieneIngrediente = true;
                break;
            }
        }
        
        if (tieneIngrediente) {
            recetasFiltradas.push(recetas[i]);
            console.log("✓ " + recetas[i].nombre);
        }
    }
    
    if (recetasFiltradas.length === 0) {
        console.log(" No hay recetas con " + ingrediente);
        console.log("Mostrando todas las opciones.\n");
        return recetas;
    }
    
    console.log("\n");
    return recetasFiltradas;
}

function seleccionarRecetas(listadoRecetas) {
    console.log(" RECETAS DISPONIBLES \n");
    
    for (let i = 0; i < listadoRecetas.length; i++) {
        console.log((i + 1) + ". " + listadoRecetas[i].nombre + 
                    " - " + listadoRecetas[i].tiempo + " min");
    }
    console.log("\n");
    
    let seguir = true;
    
    while (seguir) {
        let num = prompt("Ingresá el número de receta (1 a " + listadoRecetas.length + "):");
        num = +num;
        
        if (num >= 1 && num <= listadoRecetas.length) {
            let receta = listadoRecetas[num - 1];
            recetasSeleccionadas.push(receta);
            console.log("Agregaste: " + receta.nombre + "\n");
        } else {
            console.log(" Número inválido\n");
        }
        
        seguir = confirm("¿Querés agregar otra receta?");
    }
}

function mostrarResumen() {
    console.log("\nRESUMEN DE " + nombreUsuario + "\n");
    
    if (recetasSeleccionadas.length === 0) {
        console.log("No seleccionaste recetas.\n");
        alert("No seleccionaste recetas");
    } else {
        let tiempo = 0;
        
        for (let i = 0; i < recetasSeleccionadas.length; i++) {
            console.log((i + 1) + ". " + recetasSeleccionadas[i].nombre);
            tiempo = tiempo + recetasSeleccionadas[i].tiempo;
        }
        
        console.log("\nTiempo total: " + tiempo + " minutos\n");
        alert("Seleccionaste " + recetasSeleccionadas.length + " recetas\nTiempo total: " + tiempo + " min");
    }
}


solicitarDatosUsuario();
let recetasDisponibles = elegirTipoFiltro();
seleccionarRecetas(recetasDisponibles);
mostrarResumen();