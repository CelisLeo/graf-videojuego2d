# 🎃 Pumpkin Panic
### Instituto Tecnológico de Pachuca  
**Carrera:** Ingeniería en Sistemas Computacionales  
**Materia:** Graficación  
**Evaluación:** Examen de Unidades III y IV de Graficación (I.S.C.)  
**Autor:** Leonardo Miguel Celis García  
**Fecha de entrega:** 20 Octubre 2025  

---

## 🧩 Contexto General del Proyecto
**Pumpkin Panic** es un videojuego 2D desarrollado en **HTML5 Canvas**, con la temática de **Halloween / Día de Muertos**, cumpliendo los requisitos de la actividad de evaluación de las unidades III y IV de la materia de **Graficación**.  
El juego está diseñado para ejecutarse en navegador, utilizando tecnologías web puras (HTML, CSS, JavaScript y Bootstrap).  

Su propósito es demostrar el manejo de:
- Elementos gráficos en movimiento aleatorio dentro de un canvas.
- Interactividad con el usuario mediante el mouse.
- Integración de imágenes, íconos, música y efectos visuales.
- Conceptos de animación, eventos, detección de colisiones y control del renderizado 2D.

---

# 🧾 Historial de versiones

---

## 🟢 Versión **v0.1 — Inicial (20/10/2025)**
### 🧭 Contexto
Inicio del desarrollo del videojuego **Pumpkin Panic**, creado para el examen de Graficación.  
Se estableció la estructura base del proyecto y se implementaron los requisitos fundamentales del enunciado.

### 🎯 Objetivo
Construir un videojuego completamente funcional que:
- Muestre elementos 2D en movimiento aleatorio.
- Permita eliminar objetos mediante clic del mouse.
- Presente un fondo, puntuación e interfaz con Bootstrap.
- Inicie con un diseño temático de Halloween.

### ⚙️ Justificación
Esta primera versión sirve como **base técnica sólida** para añadir futuras mejoras.  
El objetivo es cumplir con todos los requerimientos mínimos del examen y dejar preparado el entorno para iteraciones posteriores, manteniendo organización mediante **versionado controlado (Git)**.

### 🕹️ Operación del videojuego
1. **Inicio:** Al cargar la página, el fondo (`BG.jpg`) y las calabazas (`pumpkin.png`) aparecen dentro del canvas.  
2. **Interacción:**  
   - Las calabazas se desplazan en direcciones aleatorias (vertical, diagonal, circular, zigzag, etc.).  
   - El jugador debe hacer clic sobre ellas para eliminarlas y ganar puntos.  
   - El cursor se reemplaza por un **retículo visual** personalizado.  
   - Puede pausar el juego presionando **Espacio**.  
   - Se puede reproducir/pausar música con el botón lateral (requiere archivo `bg-music.mp3` en `/assets`).  
3. **Interfaz:**  
   - Contador de puntuación en tiempo real.  
   - Instrucciones claras y panel lateral con consejos.  
   - Diseño responsivo mediante **Bootstrap 5**.  
4. **Recursos:**  
   - `/assets/BG.jpg`: fondo principal del escenario.  
   - `/assets/pumpkin.png`: sprite del NPC y favicon.  
   - `/assets/bg-music.mp3`: música opcional de fondo.  

### 🧠 Conclusiones
- Se logró un entorno visual fluido, atractivo y funcional, con elementos animados por programación 2D pura.  
- La interacción por clic, el manejo de estados (pausa, puntuación, spawn aleatorio) y el diseño modular del código crean una buena base para extender el juego.  
- El uso del **canvas 2D API** permitió comprender y aplicar los fundamentos de animación y renderizado frame a frame.  
- El uso de **Bootstrap** y la separación de archivos (`index.html`, `main.js`, `style.css`) facilita la escalabilidad y el mantenimiento del proyecto.  

---

# 📂 Estructura del Proyecto
📦 PumpkinPanic/
    ├── index.html
    ├── style.css
    ├── main.js
    ├── README.md
    └── assets/
        ├── BG.jpg
        ├── pumpkin.png
        └── bg-music.mp3
        
---

# 💡 Próximas versiones previstas
| Versión | Objetivo principal | Descripción breve |
|----------|--------------------|-------------------|
| v0.2 | Mejora de jugabilidad | Agregar niveles, sistema de tiempo y dificultad progresiva. |
| v0.3 | Efectos de sonido | Incorporar sonidos al eliminar calabazas y efectos visuales más dinámicos. |
| v0.4 | Menú inicial y reinicio | Crear pantalla de inicio, game over y opción de reinicio. |
| v0.5 | Pulido final | Optimización, ajustes visuales y documentación completa. |

---

# 🧑‍💻 Control de versiones (Git)
**Commit inicial:**

---

_© 2025 Leonardo Miguel Celis García — Instituto Tecnológico de Pachuca_
