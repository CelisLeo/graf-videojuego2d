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

# 📜 Historial de versiones

| Versión | Fecha | Descripción breve |
|----------|--------|------------------|
| 0.2 | 20 Oct 2025 | Efectos de sonido, rediseño visual, pantalla completa |
| 0.1 | 19 Oct 2025 | Proyecto base: estructura inicial del videojuego |

---

# 🧩 Versión 0.2 – Mejora visual, efectos de sonido y estructura general

### 📅 Fecha del commit:
20 Octubre 2025

### 🎯 Contexto:
Se implementó una mejora visual y auditiva al videojuego, buscando un diseño más limpio, moderno y con mejor experiencia de usuario.  
Además, se agregaron efectos de sonido que acompañan acciones importantes dentro del juego.

### ⚙️ Objetivo:
- Mejorar la presentación general del videojuego.  
- Integrar sonidos de interacción (efecto *pop* y música de *intro*).  
- Reestructurar el diseño de la página para una distribución más profesional y clara.

### 💡 Justificación:
El diseño anterior se centraba únicamente en el canvas, sin jerarquía visual ni distribución adecuada de los elementos.  
Esta actualización permite al jugador tener información accesible sin interferir en la jugabilidad, y una inmersión auditiva básica.

### 🔧 Cambios realizados:
1. **Nuevo efecto de sonido:**  
   - Archivo `pop.mp3`, reproducido al realizar determinadas acciones (por ejemplo, al eliminar o interactuar con un objeto).  
2. **Intro musical:**  
   - Archivo `intro.mp3`, reproducido al iniciar el nivel o cargar la pantalla principal.
3. **Rediseño estructural del HTML:**  
   - El **título principal** se mantiene arriba.  
   - Las **instrucciones** se ubican justo debajo del título (sin sobreponerse al canvas).  
   - El **puntaje** se mueve a la **parte superior derecha**.  
   - La **información del juego** (estado, descripción o créditos) ahora aparece en la **parte inferior**.  
   - Se agregó un **margen visual** alrededor del canvas, para no ocupar toda la pantalla y dar una mejor estética.  
4. **Transiciones monocromáticas** entre secciones, para suavizar el paso entre distintas áreas visuales.  
5. **Modo Pantalla Completa:**  
   - Se añadió un botón que permite expandir el canvas para jugar en pantalla completa.

### 🧠 Conclusiones:
Con esta actualización, el videojuego alcanza una mejor presentación, sonido ambiental y estructura visual clara.  
Se sientan las bases para futuras mejoras en jugabilidad, niveles y menús dinámicos.

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

# 💡 Próximas versiones previstas
| Versión | Objetivo principal | Descripción breve |
|----------|--------------------|-------------------|
| v0.3 | Menú inicial y reinicio | Crear pantalla de inicio, game over y opción de reinicio. |
| v0.4 | Pulido final | Optimización, ajustes visuales y documentación completa. |

---

_© 2025 Leonardo Miguel Celis García — Instituto Tecnológico de Pachuca_
