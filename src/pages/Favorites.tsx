import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useFavorites } from '../hooks/useFavorites';
import { getCharacterById } from '../services/api';
import { CharacterCard } from '../components/CharacterCard/CharacterCard';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { EmptyState } from '../components/EmptyState/EmptyState';

export const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const { data: characters, isLoading } = useQuery({
    queryKey: ['favorites', favorites],
    queryFn: async () => {
      if (favorites.length === 0) return [];
      
      const promises = favorites.map(id => getCharacterById(id));
      return Promise.all(promises);
    },
    enabled: favorites.length > 0,
  });

  if (isLoading) return <LoadingSpinner />;

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No tienes favoritos"
        description="Agrega personajes a tus favoritos para verlos aquí"
        actionLabel="Explorar personajes"
        onAction={() => navigate('/characters')}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Mis Favoritos
        </h1>
        <p className="text-gray-600">
          {favorites.length} {favorites.length === 1 ? 'personaje' : 'personajes'} guardados
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters?.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isFavorite={isFavorite(character.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};