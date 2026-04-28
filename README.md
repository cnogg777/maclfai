
# Proyecto MACFLAI (Resumen Ejecutivo)

**Versión:** 1.0 | **Fecha:** 18/03/2026 | **Asignatura:** TPY 1101 | **Equipo:** Grupo 2

---

## 1. Propósito
Desarrollar una plataforma web gratuita para que estudiantes de preuniversitarios populares se preparen para la PAES de Lectura usando **tutoría con IA**, **preguntas dinámicas** y **análisis personalizado**.

## 2. Valor Agregado
1. Tutor conversacional en tiempo real (**Sinclair**).
2. Estimación de puntaje PAES en vivo.
3. Rachas y curva de mejora por habilidad.
4. Historial de errores reincidentes.
5. Simulación de ensayo cronometrado (65 preguntas).

## 3. Conceptualización (PWA)
- **Asistente Sinclair** (API Gemini).
- **Motor de preguntas** dinámicas (3 habilidades PAES).
- **Analítica** (progreso, puntaje estimado).
- **Gamificación** (rachas diarias).

## 4. Atributos de Calidad
| Atributo | Descripción |
|----------|-------------|
| Integridad | PostgreSQL con transacciones ACID (Supabase) |
| Confiabilidad | Tasa error < 1% en simulacros |
| Precisión | Tabla de conversión DEMRE oficial |
| Oportunidad | Feedback < 2 segundos |
| Seguridad | bcrypt, sesiones 30 min |

## 5. Objetivos
**General:** Plataforma web con IA, ensayos, preguntas dinámicas y analítica.

**OE1:** Implementar tutor Sinclair (respuestas correctas ≥85%, <3 seg).
**OE2:** Dashboard analítico en tiempo real (<2 seg, 90% comprensión).

## 6. Alcance (Resumen)
| Incluye | Excluye |
|---------|---------|
| Lectura (3 habilidades), textos literarios/no literarios, 65 preguntas, PWA | Matemáticas, apps nativas, LMS, pagos, rol profesor avanzado |

## 7. Metodología: Cascada (11 semanas)
| Fase | Semanas | Entregable |
|------|---------|-------------|
| Requisitos | 1 | Documento requisitos |
| Diseño | 2-3 | BD + Prototipo UI |
| Implementación | 4-8 | Plataforma alpha |
| Pruebas | 9-10 | Beta + Informe |
| Despliegue | 11 (días 1-4) | URL en línea |
| Mantenimiento | 11 (día 5) | Versión 1.0 |

## 8. Equipo y Roles
| Rol | Integrante |
|-----|-------------|
| Jefe Proyecto / QA / Front End | Maximiliano Villela |
| DBA / Analista Funcional | Joaquin Mateo Diez Gioia |
| Back End | Andrés Jehu Yáñez González |

## 9. Tecnologías
- **Front:** TypeScript, Angular
- **Back:** Python (FastAPI)
- **BD:** PostgreSQL (Supabase)
- **Despliegue:** Vercel (front), Render (back)
- **IA:** Gemini API (gratuita)

## 10. Estado del Arte (Homologación)
MACFLAI es la única solución que cumple **8/8 criterios** (generación dinámica, tutoría IA, ensayo, errores, puntaje en vivo, racha, curva, gratuidad). Competidores (Puntaje Nacional, PDV Online, PreuText, ChatGPT) cumplen parcialmente o no cumplen.

## 11. Hitos Clave
| Hito | Semana |
|------|--------|
| Aprobación requisitos | 1 |
| Diseño validado | 3 |
| Implementación alpha | 8 |
| Pruebas beta | 10 |
| Despliegue | 11 (día 4) |
| Entrega final | 11 (día 5) |

---

**Aprobado por:**
- Maximiliano Villela (Jefe proyecto)
- Joaquin Mateo Diez Gioia (DBA/Analista)
- Andrés Jehu Yáñez González (Back End)
>>>>>>> 362dd2b9b30bdffc21ca40871e2681405d2f2659
