import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export const SearchBar = ({ onSearch, initialValue = '' }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Ref para guardar la función onSearch sin meter al useEffect como dependencia
  const onSearchRef = useRef(onSearch);

  // Actualizar el ref cada vez que cambie onSearch (sin disparar efecto)
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Ref para saltar la primera vez que se monta el componente
  const isFirstRender = useRef(true);

  // Este efecto SOLO se dispara cuando el usuario escribe algo nuevo
  useEffect(() => {
    // La primera vez que monta el componente, no hace nada
    // Esto evita que llame a handleSearch y resetee la página
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onSearchRef.current(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]); // Solo depende de searchTerm, no de onSearch

  return (
    <div className="relative">
      {/* Label oculto visualmente pero accesible para lectores de pantalla */}
      <label htmlFor="character-search" className="sr-only">
        Buscar personajes por nombre
      </label>
      
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      <input
        id="character-search"
        name="character-search"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar personajes por nombre..."
        className="w-full pl-12 pr-10 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all shadow-sm hover:shadow-md bg-white"
        aria-label="Buscar personajes por nombre"
        autoComplete="off"
      />
      
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Limpiar búsqueda"
          type="button"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* Clase sr-only para el label (agregar a index.css si no existe) */}
      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </div>
  );
};