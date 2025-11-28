# 🚌 INNOBUS - Aplicación Inteligente de Transporte Público

INNOBUS es un MVP completo para una aplicación de transporte público que incluye seguimiento en tiempo real, cálculo de rutas y un modo de navegación tipo "Waze" para usuarios de autobuses.

![GitHub](https://img.shields.io/github/license/CHURCHDEVS/INNOBUS)
![GitHub stars](https://img.shields.io/github/stars/CHURCHDEVS/INNOBUS)
![GitHub forks](https://img.shields.io/github/forks/CHURCHDEVS/INNOBUS)

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Arquitectura](#-arquitectura)
- [Documentación de la API](#-documentación-de-la-api)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## ✨ Características Principales

### 🗺️ Enrutamiento Inteligente
Calcula rutas óptimas combinando segmentos de caminata y autobús, utilizando algoritmos avanzados de optimización.

### 🚦 Modo Waze
- Detecta automáticamente cuando estás en el autobús (Snap-to-route)
- Te notifica 3 minutos antes de tu parada
- Seguimiento en tiempo real de tu progreso

### 📍 Seguimiento en Tiempo Real
Visualiza las posiciones de los autobuses y el progreso del usuario en tiempo real.

### 👨‍💼 Panel de Administración
Gestiona rutas, paradas y visualiza análisis detallados del sistema.

## 📁 Estructura del Proyecto

El proyecto está organizado como un **Monorepo**:

```
innobus/
├── backend/          # Servicio backend con FastAPI (Python)
├── mobile/           # Aplicación móvil con Flutter (Dart)
├── web/              # Aplicación web con React + Vite
├── admin/            # Panel de administración con React + Vite
├── database/         # Scripts de inicialización PostgreSQL + PostGIS
├── scripts/          # Scripts de utilidad para simulación de datos
└── docker-compose.yml
```

## 🔧 Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- **Docker & Docker Compose** - Para contenedores
- **Node.js** (v16+) - Para Web/Admin
- **Flutter SDK** (v3.0+) - Para la aplicación móvil
- **Python 3.10+** - Para desarrollo local del backend

## 🚀 Instalación y Configuración

### Opción 1: Inicio Rápido (Windows)

Ejecuta el script de inicio automático:

```bash
start_dev.bat
```

Este script iniciará automáticamente:
- Base de datos (PostgreSQL + PostGIS)
- Backend (FastAPI)
- Aplicación Web
- Panel de Administración

### Opción 2: Inicio Manual

#### 1️⃣ Iniciar Infraestructura (Base de Datos & Backend)

```bash
docker-compose up --build
```

Esto iniciará:
- **Base de Datos**: PostgreSQL + PostGIS en el puerto `5432`
- **Backend**: FastAPI en el puerto `8000` ([http://localhost:8000](http://localhost:8000))

#### 2️⃣ Poblar Datos de Prueba

Una vez que la base de datos esté en funcionamiento, ejecuta el script de simulación para poblar paradas, rutas y viajes:

```bash
# Instalar dependencias
pip install psycopg2-binary

# Ejecutar script
python scripts/simulate_data.py
```

#### 3️⃣ Ejecutar Aplicación Web

```bash
cd web
npm install
npm run dev
```

**Acceso**: [http://localhost:3000](http://localhost:3000)

#### 4️⃣ Ejecutar Panel de Administración

```bash
cd admin
npm install
npm run dev
```

**Acceso**: [http://localhost:3001](http://localhost:3001)

#### 5️⃣ Ejecutar Aplicación Móvil

```bash
cd mobile
flutter pub get
flutter run
```

## 🏗️ Arquitectura

### Backend
- **Patrón**: Arquitectura Hexagonal (Ports & Adapters)
- **Framework**: FastAPI
- **Base de Datos**: PostgreSQL con extensión PostGIS

### Base de Datos
- Consultas espaciales usando PostGIS
- Funciones: `ST_Distance`, `ST_ClosestPoint`, `ST_MakeLine`
- Optimización con índices espaciales

### Mobile
- **State Management**: Riverpod
- **Mapas**: `flutter_map` con integración OSM
- **Geolocalización**: `geolocator`

### Web & Admin
- **Framework**: React 18
- **Build Tool**: Vite
- **Estilos**: TailwindCSS
- **Mapas**: Leaflet + React-Leaflet

## 📚 Documentación de la API

Una vez que el backend esté en funcionamiento, visita la documentación interactiva de Swagger:

**[http://localhost:8000/docs](http://localhost:8000/docs)**

### Endpoints Principales

#### Rutas
- `POST /api/routing/calculate` - Calcular ruta óptima
- `GET /api/routing/routes` - Obtener todas las rutas

#### Seguimiento
- `GET /api/tracking/buses/{route_id}` - Obtener posiciones de autobuses
- `POST /api/tracking/snap-to-route` - Detectar si el usuario está en un autobús

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **CHURCHDEVS** - [GitHub](https://github.com/CHURCHDEVS)

## 🙏 Agradecimientos

- OpenStreetMap por los datos de mapas
- Comunidad de FastAPI
- Comunidad de Flutter
- Comunidad de React

---

**⭐ Si este proyecto te resultó útil, considera darle una estrella en GitHub!**
