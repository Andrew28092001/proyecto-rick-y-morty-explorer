const FAVORITES_KEY = 'rickmorty_favorites';

export const getFavorites = (): number[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

export const saveFavorites = (favorites: number[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

export const addFavorite = (characterId: number): void => {
  const favorites = getFavorites();
  if (!favorites.includes(characterId)) {
    saveFavorites([...favorites, characterId]);
  }
};

export const removeFavorite = (characterId: number): void => {
  const favorites = getFavorites();
  saveFavorites(favorites.filter(id => id !== characterId));
};

export const isFavorite = (characterId: number): boolean => {
  const favorites = getFavorites();
  return favorites.includes(characterId);
};