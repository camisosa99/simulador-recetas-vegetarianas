//CONSTANTES Y VARIABLES
const recetas = [
    { nombre: "Hamburguesa de lentejas", tiempo: 30, dificultad: "Media", vegano: true },
    { nombre: "Pastel de papas", tiempo: 45, dificultad: "Fácil", vegano: false },
    { nombre: "Tacos de garbanzos", tiempo: 20, dificultad: "Fácil", vegano: true },
    { nombre: "Lasaña de verduras", tiempo: 60, dificultad: "Difícil", vegano: false },
    { nombre: "Ensalada Mediterranea", tiempo: 15, dificultad: "Muy fácil", vegano: true }
];

let recetasSeleccionadas = [];
let nombreUsuario = "";


//FUNCIONES

// Función 1: Solicitar información al usuario

function solicitarDatosUsuario() {
    nombreUsuario = prompt("¡Bienvenido al simulador de recetas vegetarianas!\n¿Cuál es tu nombre?");

    console.log("\nHola " + nombreUsuario + ", ¡empecemos a buscar recetas perfectas para vos!\n");
}

solicitarDatosUsuario();