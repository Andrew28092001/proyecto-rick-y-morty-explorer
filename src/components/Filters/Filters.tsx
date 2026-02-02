import { useState, useEffect, useRef } from 'react';

interface FiltersProps {
  status: string;
  species: string;
  onStatusChange: (status: string) => void;
  onSpeciesChange: (species: string) => void;
}

export const Filters = ({
  status,
  species,
  onStatusChange,
  onSpeciesChange,
}: FiltersProps) => {
  // Estado local para el input de especie (antes de aplicar debounce)
  const [localSpecies, setLocalSpecies] = useState(species);

  // Ref para guardar la función onSpeciesChange
  const onSpeciesChangeRef = useRef(onSpeciesChange);

  // Actualizar el ref cuando cambie la función
  useEffect(() => {
    onSpeciesChangeRef.current = onSpeciesChange;
  }, [onSpeciesChange]);

  // Ref para saltar la primera renderización
  const isFirstRender = useRef(true);

  // ⭐ Debounce de 500ms para el filtro de especie
  useEffect(() => {
    // Primera vez: solo sincronizar sin disparar búsqueda
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setLocalSpecies(species);
      return;
    }

    // Debounce: espera 500ms después de que el usuario deje de escribir
    const timer = setTimeout(() => {
      onSpeciesChangeRef.current(localSpecies);
    }, 500);

    // Cleanup: cancela el timer si el usuario sigue escribiendo
    return () => clearTimeout(timer);
  }, [localSpecies]);

  // Sincronizar estado local cuando el prop species cambie externamente
  // (por ejemplo, al limpiar filtros)
  useEffect(() => {
    if (species !== localSpecies) {
      setLocalSpecies(species);
    }
  }, [species]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-700 mb-4">Filtros</h3>
      
      <div className="space-y-4">
        {/* Status filter - Sin debounce porque es un select */}
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <select
            id="status-filter"
            name="status-filter"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="alive">Vivo</option>
            <option value="dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        {/* Species filter - CON debounce de 500ms */}
        <div>
          <label htmlFor="species-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Especie
          </label>
          <input
            id="species-filter"
            name="species-filter"
            type="text"
            value={localSpecies}
            onChange={(e) => setLocalSpecies(e.target.value)}
            placeholder="Ej: Human, Alien..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
          {localSpecies && (
            <p className="text-xs text-gray-500 mt-1">
              Buscando después de 500ms...
            </p>
          )}
        </div>

        {/* Clear filters button */}
        {(status || localSpecies) && (
          <button
            onClick={() => {
              onStatusChange('');
              setLocalSpecies('');
              onSpeciesChangeRef.current('');
            }}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};