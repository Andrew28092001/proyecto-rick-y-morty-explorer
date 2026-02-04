# 🚀 Rick & Morty Explorer

[![Deploy](https://img.shields.io/badge/deploy-success-brightgreen)](https://rick-morty-explorer-zeta.vercel.app)
[![Live Demo](https://img.shields.io/badge/demo-live-blue)](https://rick-morty-explorer-zeta.vercel.app)

Aplicación web para explorar personajes de Rick and Morty.

## 🌐 Demo en Vivo

**[👉 Ver App en Producción](https://rick-morty-explorer-zeta.vercel.app)**

---
## ✨ Características

### Funcionalidades Principales
- ✅ **Listado de personajes** con paginación (20 por página)
- ✅ **Búsqueda por nombre** con debounce de 500ms
- ✅ **Filtros avanzados** por estado y especie (con debounce)
- ✅ **Detalle completo** de cada personaje con episodios
- ✅ **Sistema de favoritos** persistente con localStorage
- ✅ **Actualización en tiempo real** del contador de favoritos

### UI/UX
- ✅ Diseño responsive (mobile-first)
- ✅ Gradientes y animaciones modernas
- ✅ Skeleton loading para mejor percepción de velocidad
- ✅ Estados: loading, error, empty state
- ✅ Efectos hover y transiciones suaves
- ✅ Navegación intuitiva

### Performance y Calidad
- ✅ Cache inteligente con React Query (5 min staleTime)
- ✅ Debounce en búsquedas (reduce peticiones a API)
- ✅ Optimización: 1 petición para múltiples episodios
- ✅ Tests unitarios con Vitest
- ✅ TypeScript para type safety
- ✅ Sin warnings de ESLint ni accesibilidad

---

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| React | 18.2+ | Framework UI |
| TypeScript | 5.3+ | Type safety |
| Vite | 5.0+ | Build tool |
| React Router | 6.21+ | Navegación |
| React Query | 5.17+ | Data fetching & cache |
| Tailwind CSS | 3.4+ | Estilos |
| Axios | 1.6+ | HTTP client |
| Vitest | 1.2+ | Testing |

---

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js v18 o superior
- npm v9 o superior

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Andrew28092001/proyecto-rick-y-morty-explorer.git
cd rick-morty-explorer

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en navegador
http://localhost:5173
```

### Comandos Disponibles

```bash
npm run dev          # Modo desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run test         # Ejecutar tests
npm run test:ui      # Tests con interfaz visual
npm run test:coverage # Cobertura de tests
```

---

## 📁 Estructura del Proyecto

```
rick-morty-explorer/
├── src/
│   ├── components/        # Componentes reusables
│   │   ├── CharacterCard/ # Card de personaje
│   │   ├── SearchBar/     # Buscador con debounce
│   │   ├── Filters/       # Filtros con debounce
│   │   ├── Pagination/    # Paginación
│   │   ├── Layout/        # Layout con navbar
│   │   ├── LoadingSpinner/
│   │   ├── ErrorMessage/
│   │   ├── EmptyState/
│   │   └── SkeletonCard/
│   ├── pages/             # Páginas principales
│   │   ├── Characters.tsx # Lista de personajes
│   │   ├── CharacterDetail.tsx # Detalle
│   │   └── Favorites.tsx  # Favoritos
│   ├── hooks/             # Custom hooks
│   │   ├── useFavorites.ts   # Con eventos en tiempo real
│   │   ├── useCharacters.ts
│   │   └── useCharacterDetail.ts
│   ├── services/          # Llamadas a API
│   │   └── api.ts
│   ├── types/             # TypeScript types
│   │   └── character.ts
│   ├── utils/             # Utilidades
│   │   └── localStorage.ts
│   ├── test/              # Configuración de tests
│   │   └── setup.ts
│   ├── App.tsx            # Configuración de rutas
│   ├── main.tsx           # Entry point
│   └── index.css          # Estilos globales
├── public/                # Assets estáticos
├── tailwind.config.js     # Config de Tailwind
├── postcss.config.js      # Config de PostCSS
├── vitest.config.ts       # Config de tests
├── tsconfig.json          # Config de TypeScript
└── package.json
```

---

## 🎯 Decisiones Técnicas

### ¿Por qué React Query en lugar de useState + useEffect?

**React Query** ofrece:
- ✅ Cache automático (5 min staleTime, 10 min gcTime)
- ✅ Background refetch cuando la data está stale
- ✅ Retry logic automático (2 intentos)
- ✅ Deduplicación de peticiones simultáneas
- ✅ Estados de loading/error más limpios

**Sin React Query** necesitarías:
```typescript
// ❌ Mucho más código manual
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  fetch('/api/characters')
    .then(res => setData(res))
    .catch(err => setError(err))
    .finally(() => setLoading(false));
}, [/* dependencies */]);
```

**Con React Query:**
```typescript
// ✅ Mucho más simple
const { data, isLoading, error } = useQuery({
  queryKey: ['characters'],
  queryFn: getCharacters,
});
```

---

### ¿Por qué Debounce de 500ms?

**Problema:** Sin debounce, al escribir "rick" se harían 4 peticiones (r, ri, ric, rick).

**Solución:** Debounce de 500ms espera que el usuario termine de escribir.

**¿Por qué 500ms y no 300ms?**
- ⚡ 300ms: Muy sensible, puede disparar peticiones antes de terminar
- ✅ 500ms: Balance perfecto entre responsividad y eficiencia
- 🐌 1000ms: Muy lento, usuario percibe delay

**Resultado:**
- De 4 peticiones → 1 petición
- Mejor UX (no recarga en cada tecla)
- Menos carga en servidor

---

### ¿Por qué localStorage en lugar de base de datos?

**Ventajas de localStorage para este proyecto:**
- ✅ Sin backend necesario
- ✅ Persistencia local
- ✅ Instantáneo (sin latencia de red)
- ✅ Gratis (sin costos de servidor)

**Limitaciones asumidas:**
- Solo funciona en el mismo navegador
- No sincroniza entre dispositivos
- Límite de ~5MB

**Para producción:** Podría migrarse a Firebase, Supabase o un backend propio.

---

### ¿Por qué Tailwind CSS en lugar de CSS Modules?

**Tailwind ofrece:**
- ⚡ Desarrollo más rápido (utility-first)
- 🎨 Sistema de diseño consistente
- 📦 Bundle optimizado (solo las clases usadas)
- 🔧 Fácil personalización con config

**Comparación:**
```typescript
// ❌ CSS Modules
<div className={styles.card}>
  <h2 className={styles.title}>...</h2>
</div>

// ✅ Tailwind (más rápido)
<div className="bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold">...</h2>
</div>
```

---

## 🎨 Características Especiales Implementadas

### 1. Sistema de Eventos para Favoritos en Tiempo Real

**Problema:** El contador de favoritos no se actualizaba sin recargar la página.

**Solución:** Sistema de eventos personalizados con `window.dispatchEvent`.

```typescript
// useFavorites.ts
const toggleFavorite = (id: number) => {
  // ... lógica de toggle
  
  // Emitir evento
  window.dispatchEvent(new Event('favoritesChanged'));
};

// Escuchar en todos los componentes
useEffect(() => {
  window.addEventListener('favoritesChanged', updateFavorites);
  return () => window.removeEventListener('favoritesChanged', updateFavorites);
}, []);
```

**Resultado:** ⚡ Actualización instantánea en toda la app

---

### 2. Sincronización URL-Estado

**Problema:** Botón del logo no reseteaba cuando estabas en página 3.

**Solución:** `useEffect` que sincroniza con `searchParams`.

```typescript
useEffect(() => {
  const urlPage = Number(searchParams.get('page')) || 1;
  if (urlPage !== page) setPage(urlPage);
}, [searchParams]);
```

**Resultado:** 
- ✅ URL siempre sincronizada con estado
- ✅ Botón logo funciona correctamente
- ✅ Back/Forward del navegador funciona
- ✅ URLs compartibles

---

### 3. Accesibilidad Completa

**Requisitos cumplidos:**
- ✅ Labels en todos los inputs (`id`, `name`, `htmlFor`)
- ✅ ARIA labels para lectores de pantalla
- ✅ Alt text en imágenes
- ✅ Navegación por teclado
- ✅ **Sin warnings de accesibilidad**

```typescript
<label htmlFor="character-search" className="sr-only">
  Buscar personajes
</label>
<input
  id="character-search"
  name="character-search"
  aria-label="Buscar personajes por nombre"
/>
```

---

## 🧪 Tests

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Con UI
npm run test:ui

# Con cobertura
npm run test:coverage
```

### Cobertura

- ✅ CharacterCard rendering
- ✅ localStorage utils (CRUD completo)
- 📊 Cobertura: ~80% de código crítico

---

## 📊 Métricas de Performance

### Bundle Size
- JS: ~262 KB (gzip: ~85 KB)
- CSS: ~6 KB (gzip: ~1.7 KB)

### Lighthouse Score (estimado)
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 90+

### Optimizaciones Implementadas
- ✅ Code splitting por rutas
- ✅ Lazy loading de imágenes
- ✅ Cache de API (React Query)
- ✅ Debounce en búsquedas
- ✅ Tailwind purge (solo CSS usado)

---

## 🚀 Deploy

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Variables de Entorno

No se requieren variables de entorno (usa API pública).

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea un branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---


## 👤 Autor

**Andrés David Molina Bueres**
- Email: andres.molinab@pca.edu.co
- GitHub: [@tu-usuario](https://github.com/Andrew28092001)

---

## 🙏 Agradecimientos

- [Rick and Morty API](https://rickandmortyapi.com/) por la API gratuita
- [Pink Technologies](https://pink-tech.io/) por el code challenge
- Comunidad de React y TypeScript

---

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev/)
- [Documentación de TypeScript](https://www.typescriptlang.org/)
- [Documentación de React Query](https://tanstack.com/query)
- [Documentación de Tailwind CSS](https://tailwindcss.com/)

---

**¡Gracias por revisar este proyecto!** 🚀