import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCharacters } from '../hooks/useCharacters';
import { useFavorites } from '../hooks/useFavorites';
import { CharacterCard } from '../components/CharacterCard/CharacterCard';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { Filters } from '../components/Filters/Filters';
import { Pagination } from '../components/Pagination/Pagination';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { SkeletonCard } from '../components/SkeletonCard/SkeletonCard';

export const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = useState(searchParams.get('name') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [species, setSpecies] = useState(searchParams.get('species') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  // ⭐ NUEVO: Sincronizar estado con URL cuando cambian los searchParams
  // Esto soluciona que el botón del logo resetee correctamente
  useEffect(() => {
    const urlName = searchParams.get('name') || '';
    const urlStatus = searchParams.get('status') || '';
    const urlSpecies = searchParams.get('species') || '';
    const urlPage = Number(searchParams.get('page')) || 1;

    // Solo actualizar si los valores son diferentes
    if (urlName !== name) setName(urlName);
    if (urlStatus !== status) setStatus(urlStatus);
    if (urlSpecies !== species) setSpecies(urlSpecies);
    if (urlPage !== page) setPage(urlPage);
  }, [searchParams]); // Se ejecuta cada vez que la URL cambia

  const { toggleFavorite, isFavorite } = useFavorites();

  const { data, isLoading, error, refetch } = useCharacters({
    name,
    status: status as 'alive' | 'dead' | 'unknown' | undefined,
    species,
    page,
  });

  const updateURL = (newParams: Record<string, string>) => {
    const params = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const handleSearch = (query: string) => {
    if (query === name) return;
    setName(query);
    setPage(1);
    updateURL({ name: query, status, species, page: '1' });
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setPage(1);
    updateURL({ name, status: newStatus, species, page: '1' });
  };

  const handleSpeciesChange = (newSpecies: string) => {
    setSpecies(newSpecies);
    setPage(1);
    updateURL({ name, status, species: newSpecies, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateURL({ name, status, species, page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setName('');
    setStatus('');
    setSpecies('');
    setPage(1);
    setSearchParams({});
  };

  const hasActiveFilters = name || status || species;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Explorador de Personajes
            </h1>
            <p className="text-gray-500 text-lg">Descubre el multiverso de Rick and Morty</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const isNotFoundError = error.message?.includes('404') || 
                           error.message?.includes('not found') ||
                           error.message?.includes('no encontrado');

    if (isNotFoundError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4 py-10">
            <div className="mb-10 text-center">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Explorador de Personajes
              </h1>
              <p className="text-gray-500 text-lg">Descubre el multiverso de Rick and Morty</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="lg:col-span-3">
                <SearchBar onSearch={handleSearch} initialValue={name} />
              </div>
              <div>
                <Filters
                  status={status}
                  species={species}
                  onStatusChange={handleStatusChange}
                  onSpeciesChange={handleSpeciesChange}
                />
              </div>
            </div>

            <EmptyState
              title="No se encontraron personajes"
              description={
                hasActiveFilters
                  ? "No encontramos personajes que coincidan con tu búsqueda. Intenta ajustar los filtros o buscar con otros términos."
                  : "No hay personajes disponibles en este momento."
              }
              actionLabel={hasActiveFilters ? "Limpiar filtros" : undefined}
              onAction={hasActiveFilters ? handleClearFilters : undefined}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Explorador de Personajes
            </h1>
            <p className="text-gray-500 text-lg">Descubre el multiverso de Rick and Morty</p>
          </div>
          <ErrorMessage
            message="Error al cargar personajes. Por favor, verifica tu conexión e intenta nuevamente."
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  if (!data?.results || data.results.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Explorador de Personajes
            </h1>
            <p className="text-gray-500 text-lg">Descubre el multiverso de Rick and Morty</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <SearchBar onSearch={handleSearch} initialValue={name} />
            </div>
            <div>
              <Filters
                status={status}
                species={species}
                onStatusChange={handleStatusChange}
                onSpeciesChange={handleSpeciesChange}
              />
            </div>
          </div>

          <EmptyState
            title="No se encontraron personajes"
            description={
              hasActiveFilters
                ? "No encontramos personajes que coincidan con tu búsqueda. Intenta con otros filtros o términos de búsqueda."
                : "No hay personajes disponibles."
            }
            actionLabel={hasActiveFilters ? "Limpiar filtros" : undefined}
            onAction={hasActiveFilters ? handleClearFilters : undefined}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-10">

        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Explorador de Personajes
          </h1>
          <p className="text-gray-500 text-lg">
            Descubre el multiverso de Rick and Morty
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <SearchBar onSearch={handleSearch} initialValue={name} />
          </div>
          <div>
            <Filters
              status={status}
              species={species}
              onStatusChange={handleStatusChange}
              onSpeciesChange={handleSpeciesChange}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
          <p className="text-gray-600 text-sm">
            Mostrando{' '}
            <span className="font-bold text-purple-600">{data.results.length}</span> de{' '}
            <span className="font-bold text-purple-600">{data.info.count}</span> personajes
          </p>
          <p className="text-sm text-gray-400">
            Página <span className="font-semibold text-gray-600">{page}</span> de{' '}
            <span className="font-semibold text-gray-600">{data.info.pages}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
          {data.results.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isFavorite={isFavorite(character.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalPages={data.info.pages}
          hasNext={!!data.info.next}
          hasPrev={!!data.info.prev}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};