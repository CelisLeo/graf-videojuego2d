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
- Interactividad con el usuario mediante el mouse y teclado.
- Integración de imágenes, íconos, música y efectos visuales.
- Conceptos de animación, eventos, detección de colisiones y control del renderizado 2D.

---

# 📜 Historial de versiones

| Versión | Fecha | Descripción breve |
|----------|--------|------------------|
| 0.3 | 20 Oct 2025 | Movimiento del cursor con teclado + mouse, mejoras visuales y estilización |
| 0.2 | 20 Oct 2025 | Efectos de sonido, rediseño visual, pantalla completa |
| 0.1 | 20 Oct 2025 | Proyecto base: estructura inicial del videojuego |

---

# 🧩 Versión 0.3 – Movimiento por teclado y mejoras visuales

### 📅 Fecha del commit:
20 Octubre 2025

### 🎯 Contexto:
Se agregó movimiento híbrido del cursor, permitiendo control por teclado y mouse al mismo tiempo.  
Además, se estilizó mejor la visualización de las instrucciones y la puntuación, logrando un diseño más limpio y funcional.

### ⚙️ Objetivo:
- Permitir mover el cursor con las **flechas del teclado** además del mouse.  
- Mejorar la presentación visual de las instrucciones y la ubicación del puntaje.  
- Mantener la compatibilidad con los efectos de sonido y la música de fondo.  

### 💡 Justificación:
Esta versión mejora la jugabilidad, accesibilidad y experiencia del usuario, manteniendo la estética y la fluidez de la animación del juego.

### 🔧 Cambios realizados:
1. **Control híbrido del cursor:**  
   - Flechas del teclado (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) para mover el puntero.  
   - Movimiento del mouse sigue activo y sincronizado.  
2. **Clic y barra espaciadora:**  
   - Eliminación de calabazas mediante clic o presionando `Espacio`.  
3. **Estilización de la interfaz:**  
   - Instrucciones colocadas debajo del título.  
   - Puntaje ubicado en la esquina superior derecha.  
   - Fondo y canvas con bordes, sombras y gradientes más definidos.  
4. **Código documentado y refactorizado:**  
   - Comentarios claros sobre cada sección: sprites, audio, bucle de animación, eventos y lógica de colisiones.  
5. **Modo pantalla completa:**  
   - Botón funcional para expandir o salir del modo fullscreen.

### 🧠 Conclusiones:
La versión 0.3 introduce un control más completo y accesible, además de mejoras visuales y de código que facilitan futuras actualizaciones como niveles, dificultad progresiva o animaciones adicionales.

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
   - Archivo `pop.mp3`, reproducido al eliminar o interactuar con calabazas.  
2. **Intro musical:**  
   - Archivo `intro.mp3`, reproducido al iniciar el nivel.  
3. **Rediseño estructural del HTML:**  
   - Título principal arriba.  
   - Instrucciones justo debajo del título.  
   - Puntaje en la parte superior derecha.  
   - Información de créditos en la parte inferior.  
   - Margen visual alrededor del canvas.  
4. **Transiciones monocromáticas** entre secciones.  
5. **Modo Pantalla Completa:** Botón funcional.

### 🧠 Conclusiones:
El juego alcanza mejor presentación, sonido ambiental y estructura visual clara.  
Se sientan bases para futuras mejoras en jugabilidad, niveles y menús dinámicos.

---

## 🟢 Versión 0.1 – Inicial

### 🧭 Contexto
Inicio del desarrollo del videojuego **Pumpkin Panic**, creado para el examen de Graficación.  
Se estableció la estructura base del proyecto y se implementaron los requisitos fundamentales del enunciado.

### 🎯 Objetivo
Construir un videojuego funcional que:
- Muestre elementos 2D en movimiento aleatorio.  
- Permita eliminar objetos mediante clic del mouse.  
- Presente fondo, puntuación e interfaz con Bootstrap.  
- Inicie con temática de Halloween.

### ⚙️ Justificación
Esta versión sirve como base técnica sólida para añadir futuras mejoras.  
Cumple con los requisitos mínimos del examen y deja preparado el entorno para iteraciones posteriores.

### 🕹️ Operación
1. Fondo (`BG.jpg`) y calabazas (`pumpkin.png`) aparecen en el canvas.  
2. Calabazas se desplazan en varias direcciones (vertical, diagonal, circular, zigzag).  
3. Cursor personalizado reemplaza al nativo.  
4. Pausa con **Espacio**, clic para eliminar calabazas.  
5. Interfaz con puntaje, instrucciones y diseño responsivo (Bootstrap).  
6. Recursos: `/assets/BG.jpg`, `/assets/pumpkin.png`, `/assets/bg-music.mp3`.

### 🧠 Conclusiones
- Entorno visual fluido y atractivo.  
- Interacción clara y modularidad en el código.  
- Base sólida para futuras versiones con niveles, animaciones y mejoras de jugabilidad.

---

# 💡 Próximas versiones previstas
| Versión | Objetivo principal | Descripción breve |
|----------|--------------------|-------------------|
| 0.4 | Sistema de niveles y temporizador | Añadir dificultad progresiva y control de tiempo por nivel |
| 0.5 | Pulido final | Optimización, ajustes visuales, animaciones adicionales y documentación completa |

---

_© 2025 Leonardo Miguel Celis García — Instituto Tecnológico de Pachuca_
