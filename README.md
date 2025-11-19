# Product Dashboard - Next.js 15 con Clean Architecture

Sistema de gestión de productos construido con **Next.js 15 App Router** siguiendo los principios de **Clean Architecture**.

## 🚀 Tecnologías

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS**
- **PostgreSQL** (Docker)
- **Prisma ORM 7**
- **NextAuth v5**
- **TanStack Query**
- **Zod**
- **bcryptjs**

## 📋 Requisitos Previos

- **Node.js** 18+ (se recomienda usar `nvm`)
- **Docker Desktop** (para PostgreSQL)
- **npm** o **pnpm**

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd product-dashboard
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

El archivo `.env` ya contiene las configuraciones necesarias:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/productdb?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production-use-openssl-rand-base64-32"

# Admin User Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

⚠️ **Importante**: En producción, genera un `NEXTAUTH_SECRET` seguro:

```bash
openssl rand -base64 32
```

### 4. Iniciar base de datos PostgreSQL

```bash
docker-compose up -d
```

Esto iniciará PostgreSQL en `localhost:5432` con las siguientes credenciales:
- **Usuario**: postgres
- **Contraseña**: postgres
- **Base de datos**: productdb

### 5. Configurar la base de datos

```bash
npm run setup
```

Este comando ejecutará:
- `prisma generate` - Genera el cliente de Prisma
- `prisma db push` - Crea las tablas en la base de datos
- `prisma db:seed` - Crea el usuario admin y productos de ejemplo

## 🎯 Ejecutar la aplicación

### Modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Modo producción

```bash
npm run build
npm start
```

## 👤 Credenciales de Acceso

Para acceder al dashboard en desarrollo:

- **Email**: `admin@example.com`
- **Contraseña**: `admin123`


## 📁 Estructura del Proyecto (Clean Architecture)

```
product-dashboard/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/[...nextauth]/   # NextAuth endpoints
│   │   │   └── products/             # Products CRUD endpoints
│   │   ├── dashboard/                # Dashboard page (protected)
│   │   ├── login/                    # Login page
│   │   ├── layout.tsx                # Root layout with providers
│   │   └── page.tsx                  # Root page (redirects)
│   │
│   ├── domain/                       # CAPA DE DOMINIO
│   │   ├── entities/                 # Entidades de negocio
│   │   ├── repositories/             # Interfaces de repositorios
│   │   └── use-cases/                # Casos de uso (lógica de negocio)
│   │
│   ├── infrastructure/               # CAPA DE INFRAESTRUCTURA
│   │   ├── database/                 # Prisma client y repositorios
│   │   └── auth/                     # Configuración NextAuth
│   │
│   ├── presentation/                 # CAPA DE PRESENTACIÓN
│   │   ├── components/               # Componentes React
│   │   └── hooks/                    # Custom hooks (TanStack Query)
│   │
│   ├── lib/                          # Utilidades y validaciones
│   └── middleware.ts                 # Middleware de autenticación
│
├── prisma/
│   ├── schema.prisma                 # Schema de base de datos
│   └── seed.ts                       # Script de seed
│
├── docker-compose.yml                # PostgreSQL container
└── .env                              # Variables de entorno
```

## 🏗️ Clean Architecture

El proyecto sigue los principios de Clean Architecture con tres capas:

### 1. **Domain Layer** - Lógica de Negocio
- Independiente de frameworks
- Contiene entidades, interfaces y casos de uso
- Sin dependencias externas

### 2. **Infrastructure Layer** - Implementaciones
- Implementa interfaces del dominio
- Conexión a base de datos (Prisma)
- Autenticación (NextAuth)

### 3. **Presentation Layer** - UI
- Componentes React
- Hooks de TanStack Query
- Lógica de presentación

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| POST | `/api/products` | Crear un nuevo producto |
| PUT | `/api/products/[id]` | Actualizar un producto |
| DELETE | `/api/products/[id]` | Eliminar un producto |
| POST | `/api/products/delete-group` | Eliminar múltiples productos |

## 🎨 Funcionalidades

### Autenticación
- ✅ Login con credenciales
- ✅ Protección de rutas con middleware
- ✅ Sesión persistente con NextAuth v5
- ✅ Redirección automática

### Dashboard de Productos
- ✅ Lista de productos
- ✅ Crear producto (modal)
- ✅ Editar producto (modal)
- ✅ Eliminar producto (confirmación)
- ✅ Selección múltiple
- ✅ Eliminación masiva
- ✅ Actualización automática (TanStack Query)
- ✅ Validación con Zod

## 🧰 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo

# Producción
npm run build            # Build de producción
npm start                # Servidor de producción

# Base de datos
npm run db:generate      # Genera cliente Prisma
npm run db:push          # Sincroniza schema con DB
npm run db:seed          # Ejecuta seed
npm run db:studio        # Abre Prisma Studio
npm run setup            # Setup completo (generate + push + seed)
```

## 🗄️ Base de Datos

### Explorar Base de Datos

```bash
npm run db:studio
```

Abre Prisma Studio en [http://localhost:5555](http://localhost:5555)

### Reiniciar Base de Datos

```bash
docker-compose down -v
docker-compose up -d
npm run setup
```

## 🔒 Seguridad

- ✅ Contraseñas hasheadas (bcryptjs)
- ✅ Validación de inputs (Zod)
- ✅ Protección CSRF (NextAuth)
- ✅ Variables de entorno
- ✅ Middleware de autenticación

## 🚀 Despliegue

### Variables de Entorno Requeridas

- `DATABASE_URL` - URL de PostgreSQL
- `NEXTAUTH_URL` - URL de la aplicación
- `NEXTAUTH_SECRET` - Secret para JWT
- `ADMIN_EMAIL` - Email del admin
- `ADMIN_PASSWORD` - Password del admin

## 🧪 Pruebas

1. **Iniciar sesión**: `admin@example.com` / `admin123`
2. **Crear producto**: Click en "Agregar Producto"
3. **Editar**: Click en "Editar" en cualquier producto
4. **Eliminar**: Click en "Eliminar" 
5. **Eliminación masiva**: Seleccionar con checkboxes → "Eliminar seleccionados"

## 📝 Notas Técnicas

### Prisma 7
Requiere adapter de PostgreSQL:
```typescript
import { PrismaPg } from '@prisma/adapter-pg';
```

### TanStack Query
Invalidación automática de cache:
```typescript
onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
```

### NextAuth v5
Configuración para App Router con estrategia JWT

## 📄 Licencia

MIT License

---

Desarrollado como challenge técnico siguiendo **Clean Architecture** principles.
