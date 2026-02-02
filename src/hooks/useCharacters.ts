import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '../services/api';
import type { CharacterFilters } from '../types/character';

export const useCharacters = (filters: CharacterFilters) => {
  return useQuery({
    queryKey: ['characters', filters],
    queryFn: () => getCharacters(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};