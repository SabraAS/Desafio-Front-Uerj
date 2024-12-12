import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Home from './Home';

import { usePokemons } from '@/queries/pokemon';
import { usePokemonStore } from '@/store/pokemon';
import { mockPokemons } from '@/test/mocks/pokemon';

// Mock dos módulos
vi.mock('@/queries/pokemon', () => ({
  usePokemons: vi.fn(),
}));

vi.mock('@/store/pokemon', () => ({
  usePokemonStore: vi.fn(),
}));

describe('Home Component', () => {
  const queryClient = new QueryClient();
  const mockAddPokemon = vi.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Setup default mock implementations
    usePokemons.mockReturnValue({
      data: mockPokemons,
      isLoading: false,
    });

    usePokemonStore.mockReturnValue({
      pokemons: [],
      addPokemon: mockAddPokemon,
    });
  });

  it('should render the title correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    expect(screen.getByText('Pokémons')).toBeInTheDocument();
  });

  it('should render pokemon cards when data is loaded', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  it('should call addPokemon when clicking on a pokemon card', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    const firstPokemonCard = screen.getByTestId('add-pokemon-bulbasaur');
    fireEvent.click(firstPokemonCard);

    expect(mockAddPokemon).toHaveBeenCalledWith(mockPokemons[0]);
  });

  it('should disable pokemon card if pokemon is already in store', () => {
    usePokemonStore.mockReturnValue({
      pokemons: [mockPokemons[0]],
      addPokemon: mockAddPokemon,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    const firstPokemonCard = screen.getByTestId('add-pokemon-bulbasaur');
    expect(firstPokemonCard).toBeDisabled();
  });

  it('should handle loading state', () => {
    usePokemons.mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
  });
});
