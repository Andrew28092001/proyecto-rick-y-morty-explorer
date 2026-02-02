import { describe, it, expect, beforeEach } from 'vitest';
import {
  getFavorites,
  saveFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
} from './localStorage';

describe('localStorage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and retrieve favorites', () => {
    const favorites = [1, 2, 3];
    saveFavorites(favorites);
    expect(getFavorites()).toEqual(favorites);
  });

  it('should add a favorite', () => {
    addFavorite(1);
    addFavorite(2);
    expect(getFavorites()).toEqual([1, 2]);
  });

  it('should not add duplicate favorites', () => {
    addFavorite(1);
    addFavorite(1);
    expect(getFavorites()).toEqual([1]);
  });

  it('should remove a favorite', () => {
    saveFavorites([1, 2, 3]);
    removeFavorite(2);
    expect(getFavorites()).toEqual([1, 3]);
  });

  it('should check if character is favorite', () => {
    saveFavorites([1, 2, 3]);
    expect(isFavorite(2)).toBe(true);
    expect(isFavorite(5)).toBe(false);
  });
});