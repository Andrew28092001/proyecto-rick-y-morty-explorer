import axios from 'axios';
import type { CharacterResponse, Character, Episode, CharacterFilters } from '../types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getCharacters = async (filters: CharacterFilters = {}): Promise<CharacterResponse> => {
  const params = new URLSearchParams();
  
  if (filters.name) params.append('name', filters.name);
  if (filters.status) params.append('status', filters.status);
  if (filters.species) params.append('species', filters.species);
  if (filters.gender) params.append('gender', filters.gender);
  if (filters.page) params.append('page', filters.page.toString());

  const response = await api.get<CharacterResponse>('/character', { params });
  return response.data;
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
};

export const getEpisodes = async (ids: number[]): Promise<Episode[]> => {
  if (ids.length === 0) return [];
  
  const idsString = ids.join(',');
  const response = await api.get<Episode | Episode[]>(`/episode/${idsString}`);
  
  return Array.isArray(response.data) ? response.data : [response.data];
};

export const extractEpisodeIds = (urls: string[]): number[] => {
  return urls.map(url => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1]);
  });
};