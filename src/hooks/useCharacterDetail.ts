import { useQuery } from '@tanstack/react-query';
import { getCharacterById, getEpisodes, extractEpisodeIds } from '../services/api';

export const useCharacterDetail = (id: number) => {
  const characterQuery = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(id),
    enabled: !!id,
  });

  const episodesQuery = useQuery({
    queryKey: ['episodes', id],
    queryFn: async () => {
      if (!characterQuery.data?.episode) return [];
      const episodeIds = extractEpisodeIds(characterQuery.data.episode);
      return getEpisodes(episodeIds);
    },
    enabled: !!characterQuery.data,
  });

  return {
    character: characterQuery.data,
    episodes: episodesQuery.data,
    isLoading: characterQuery.isLoading || episodesQuery.isLoading,
    error: characterQuery.error || episodesQuery.error,
  };
};