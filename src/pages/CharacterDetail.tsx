import { useParams, useNavigate } from 'react-router-dom';
import { useCharacterDetail } from '../hooks/useCharacterDetail';
import { useFavorites } from '../hooks/useFavorites';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const characterId = Number(id);
  const { character, episodes, isLoading, error } = useCharacterDetail(characterId);

  if (isLoading) return <LoadingSpinner />;
  
  if (error || !character) {
    return (
      <ErrorMessage
        message="No se pudo cargar el personaje"
        onRetry={() => navigate('/characters')}
      />
    );
  }

  const statusColors = {
    Alive: 'text-green-600 bg-green-100',
    Dead: 'text-red-600 bg-red-100',
    unknown: 'text-gray-600 bg-gray-100',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        ← Volver
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-2/3 p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {character.name}
                </h1>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[character.status]}`}>
                  {character.status}
                </span>
              </div>
              
              <button
                onClick={() => toggleFavorite(character.id)}
                className={`p-3 rounded-full transition-transform hover:scale-110 ${
                  isFavorite(character.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
                aria-label={isFavorite(character.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {isFavorite(character.id) ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                  Especie
                </h3>
                <p className="text-lg text-gray-800">{character.species}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                  Género
                </h3>
                <p className="text-lg text-gray-800">{character.gender}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                  Origen
                </h3>
                <p className="text-lg text-gray-800">{character.origin.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                  Ubicación
                </h3>
                <p className="text-lg text-gray-800">{character.location.name}</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Episodios ({episodes?.length || 0})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {episodes?.map((episode) => (
                  <div
                    key={episode.id}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  >
                    <p className="font-semibold text-sm text-blue-600">
                      {episode.episode}
                    </p>
                    <p className="text-sm text-gray-700 truncate" title={episode.name}>
                      {episode.name}
                    </p>
                    <p className="text-xs text-gray-500">{episode.air_date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};