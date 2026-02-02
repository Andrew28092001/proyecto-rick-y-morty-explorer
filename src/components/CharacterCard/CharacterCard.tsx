import { Link } from 'react-router-dom';
import type { Character } from '../../types/character';

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const CharacterCard = ({ 
  character, 
  isFavorite, 
  onToggleFavorite 
}: CharacterCardProps) => {
  const statusColors = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  };

  const statusText = {
    Alive: 'Vivo',
    Dead: 'Muerto',
    unknown: 'Desconocido',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <Link to={`/characters/${character.id}`}>
        <div className="relative group">
          <img
            src={character.image}
            alt={`Imagen de ${character.name}`}
            className="w-full h-72 object-cover"
          />
          
          {/* Overlay oscuro al hacer hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Ver detalle →
            </span>
          </div>
          
          {/* Badge de status */}
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
            <span className={`w-3 h-3 rounded-full ${statusColors[character.status]} animate-pulse`}></span>
            <span className="text-sm font-semibold text-gray-800">
              {statusText[character.status]}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/characters/${character.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-1">
            {character.name}
          </h3>
        </Link>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">👽</span>
            <span className="font-medium text-gray-600">Especie:</span>
            <span className="text-gray-900 font-semibold">{character.species}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">📍</span>
            <span className="font-medium text-gray-600">Ubicación:</span>
            <span className="text-gray-900 truncate flex-1">{character.location.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">🌍</span>
            <span className="font-medium text-gray-600">Origen:</span>
            <span className="text-gray-900 truncate flex-1">{character.origin.name}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(character.id);
          }}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
            isFavorite
              ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg'
              : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700'
          }`}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '❤️ En favoritos' : '🤍 Agregar a favoritos'}
        </button>
      </div>
    </div>
  );
};