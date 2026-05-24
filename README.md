# 🌱 Simulador de Recetas Vegetarianas

Una aplicación web interactiva que permite explorar, filtrar y seleccionar recetas vegetarianas y veganas, con persistencia de datos en el navegador.

---

## 📋 Descripción

El Simulador de Recetas Vegetarianas es una SPA (Single Page Application) desarrollada con HTML, CSS y JavaScript vanilla. Permite al usuario ingresar su nombre, explorar un catálogo de recetas, filtrarlas por tiempo de preparación o ingrediente disponible, y armar una lista de recetas seleccionadas con un resumen del tiempo total de cocción.

---

## ✨ Funcionalidades

- **Registro de usuario**: el nombre se guarda en `localStorage` y se muestra en visitas posteriores.
- **Carga de recetas desde JSON**: las recetas se obtienen de forma asíncrona desde `recetas.json`.
- **Filtros**:
  - Por tiempo máximo de preparación (en minutos).
  - Por ingrediente disponible (búsqueda parcial, sin distinción de mayúsculas).
  - Botón para restablecer y mostrar todas las recetas.
- **Selección de recetas**: el usuario puede agregar recetas a su lista personal; no se permiten duplicados.
- **Resumen**: muestra el total de recetas seleccionadas y el tiempo acumulado de preparación.
- **Persistencia**: las recetas seleccionadas se guardan en `localStorage` y se recuperan al recargar la página.
- **Notificaciones**: feedback visual mediante alertas y toasts con SweetAlert2.
- **Efecto parallax** en el encabezado.

---

## 🗂️ Estructura del proyecto

```
simulador-recetas/
│
├── index.html          # Estructura principal de la aplicación
├── style.css           # Estilos y diseño responsive
├── script.js           # Lógica de la aplicación
├── recetas.json        # Base de datos de recetas
│
└── assets/             # Imágenes de las recetas
    ├── fondo-header1.jpg
    ├── hamburguesa-lentejas.jpg
    ├── pastel-de-papa.jpg
    ├── hummus.jpg
    ├── empanadas.jpg
    ├── tortilla-papas.jpg
    ├── curry.jpg
    ├── quinoa.jpg
    └── pizza.jpg
```

---

## 🍽️ Recetas incluidas

| Receta                  | Tiempo | Dificultad | Vegano |
|-------------------------|--------|------------|--------|
| Hamburguesa de lentejas | 30 min | Media      | ✅     |
| Pastel de papas         | 45 min | Fácil      | ❌     |
| Hummus de garbanzos     | 15 min | Fácil      | ✅     |
| Empanadas de soja       | 45 min | Fácil      | ✅     |
| Tortilla de papas       | 35 min | Fácil      | ❌     |
| Curry de verduras       | 40 min | Media      | ✅     |
| Ensalada de quinoa      | 20 min | Fácil      | ✅     |
| Pizza vegetariana       | 50 min | Media      | ❌     |

---

## 🛠️ Tecnologías utilizadas

- **HTML5**
- **CSS3** (Grid, Flexbox, animaciones, media queries)
- **JavaScript ES6+** (async/await, Fetch API, LocalStorage)
- **[SweetAlert2](https://sweetalert2.github.io/)** — alertas y notificaciones
- **[Google Fonts](https://fonts.google.com/)** — tipografías *Outfit* y *Young Serif*

---

## 🚀 Cómo usar el proyecto

1. Cloná o descargá el repositorio.
2. Asegurate de tener la carpeta `assets/` con las imágenes correspondientes.
3. Abrí `index.html` directamente en el navegador.

> ⚠️ La carga del archivo `recetas.json` se realiza con `fetch()`, por lo que es necesario servirlo desde un servidor local para evitar errores de CORS. Podés usar una extensión como **Live Server** en VS Code, o ejecutar:

```bash
# Con Python
python -m http.server 8000
```

Luego abrí `http://localhost:8000` en tu navegador.

---

## 💾 Persistencia de datos

La aplicación utiliza `localStorage` para guardar:

| Clave                  | Contenido                              |
|------------------------|----------------------------------------|
| `nombreUsuario`        | Nombre ingresado por el usuario        |
| `recetasSeleccionadas` | Array JSON de recetas en la lista      |

Para resetear los datos, podés limpiar el almacenamiento desde las herramientas de desarrollador del navegador (`Application > Local Storage`).

---

## 📱 Diseño responsive

La interfaz se adapta a dispositivos móviles:

- Las recetas pasan de grilla a columna única.
- Los botones de filtro se apilan verticalmente.
- Las listas de selección reorganizan su layout.

---

## 🔮 Posibles mejoras futuras

- Agregar más recetas o permitir que el usuario sume las propias.
- Incorporar filtro por dificultad o por tipo (vegano / vegetariano).
- Exportar la lista de recetas seleccionadas como PDF o lista de compras.
- Agregar una vista de detalle con pasos de preparación.
- Integrar una API de recetas externa.

---

## 👩‍💻 Autora / Autor
Camila Sosa
Proyecto desarrollado como práctica de JavaScript con consumo de datos asíncronos, manipulación del DOM y persistencia en el navegador.
