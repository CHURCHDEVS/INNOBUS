# Guía de Contribución

¡Gracias por tu interés en contribuir a INNOBUS! 🚌

## Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor abre un issue con:
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs. comportamiento actual
- Screenshots si es aplicable
- Información del entorno (OS, versiones, etc.)

### Sugerir Mejoras

Las sugerencias de nuevas características son bienvenidas. Por favor:
- Describe claramente la funcionalidad propuesta
- Explica por qué sería útil
- Proporciona ejemplos de uso si es posible

### Pull Requests

1. Fork el repositorio
2. Crea una rama desde `main`:
   ```bash
   git checkout -b feature/mi-nueva-caracteristica
   ```
3. Realiza tus cambios siguiendo las guías de estilo
4. Asegúrate de que el código funcione correctamente
5. Commit con mensajes descriptivos:
   ```bash
   git commit -m "feat: añadir nueva característica X"
   ```
6. Push a tu fork:
   ```bash
   git push origin feature/mi-nueva-caracteristica
   ```
7. Abre un Pull Request

## Guías de Estilo

### Python (Backend)
- Seguir PEP 8
- Usar type hints
- Documentar funciones con docstrings

### JavaScript/React (Web/Admin)
- Usar ESLint
- Componentes funcionales con hooks
- Nombres descriptivos para variables y funciones

### Dart (Mobile)
- Seguir guías oficiales de Flutter
- Usar análisis estático (`flutter analyze`)

## Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva característica
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato, sin cambios de código
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Tareas de mantenimiento

## Código de Conducta

- Sé respetuoso y constructivo
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto
- Muestra empatía hacia otros contribuidores

## ¿Preguntas?

Si tienes preguntas, no dudes en abrir un issue o contactarnos.

¡Gracias por contribuir! 🎉
