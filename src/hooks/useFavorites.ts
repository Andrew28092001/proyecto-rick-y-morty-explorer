import { useState, useEffect } from 'react';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from '../utils/localStorage';

/**
 * Custom event para sincronizar favoritos entre componentes
 */
const FAVORITES_CHANGED_EVENT = 'favoritesChanged';

/**
 * Hook personalizado para gestionar favoritos con sincronización en tiempo real
 * Usa eventos personalizados para actualizar todos los componentes cuando cambian los favoritos
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Función para actualizar el estado desde localStorage
  const updateFavoritesFromStorage = () => {
    setFavorites(getFavorites());
  };

  // Al montar el componente, carga favoritos desde localStorage
  useEffect(() => {
    updateFavoritesFromStorage();

    // Escuchar evento personalizado de cambios en favoritos
    const handleFavoritesChange = () => {
      updateFavoritesFromStorage();
    };

    window.addEventListener(FAVORITES_CHANGED_EVENT, handleFavoritesChange);

    // Cleanup: remover listener al desmontar
    return () => {
      window.removeEventListener(FAVORITES_CHANGED_EVENT, handleFavoritesChange);
    };
  }, []);

  /**
   * Agrega o quita un personaje de favoritos
   * Emite un evento para notificar a otros componentes
   */
  const toggleFavorite = (characterId: number) => {
    if (isFavorite(characterId)) {
      removeFavorite(characterId);
    } else {
      addFavorite(characterId);
    }
    
    // Actualizar estado local
    updateFavoritesFromStorage();
    
    // Emitir evento personalizado para notificar a otros componentes
    window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};