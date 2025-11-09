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
    }
];

let recetasSeleccionadas = [];
let nombreUsuario = "";


//FUNCIONES

// Función 1: Solicitar información al usuario

function solicitarDatosUsuario() {
    nombreUsuario = prompt("¡Bienvenido al simulador de recetas vegetarianas!\n¿Cuál es tu nombre?");

    alert("\nHola " + nombreUsuario + ", ¡empecemos a buscar recetas perfectas para vos!\n");
}



// Función 2: Elegir tipo de filtro

function elegirTipoFiltro() {
    
    let opcion = prompt("¿Cómo querés buscar recetas?\n 1. Por tiempo disponible\n 2. Por ingredientes que tenés");
    opcion = +opcion;
    
    if (opcion === 1) {
        return filtrarPorTiempo();
    } else if (opcion === 2) {
        return filtrarPorIngredientes();
    } else {
        console.log("Opción inválida. Mostrando todas las recetas.");
        return recetas;
    }
}



solicitarDatosUsuario();
elegirTipoFiltro();