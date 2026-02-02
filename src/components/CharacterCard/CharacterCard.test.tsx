import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CharacterCard } from './CharacterCard';
import type { Character } from '../../types/character';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
};

describe('CharacterCard', () => {
  it('renders character information correctly', () => {
    const mockToggleFavorite = vi.fn();

    render(
      <BrowserRouter>
        <CharacterCard
          character={mockCharacter}
          isFavorite={false}
          onToggleFavorite={mockToggleFavorite}
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeDefined();
    expect(screen.getByText(/Human/i)).toBeDefined();  
    expect(screen.getByText('Vivo')).toBeDefined();
    expect(screen.getByAltText('Imagen de Rick Sanchez')).toBeDefined();
  });
});