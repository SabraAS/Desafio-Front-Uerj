import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import CartSidebar from './index';

import { usePokemonStore } from '@/store/pokemon';

// Mock do store
vi.mock('@/store/pokemon', () => ({
  usePokemonStore: vi.fn(),
}));

const mockPokemons = [
  {
    id: 1,
    name: 'Bulbasaur',
    characteristic: 'Takes plenty of siestas',
    image: 'bulbasaur.png',
  },
  {
    id: 2,
    name: 'Charmander',
    characteristic: 'Likes to run',
    image: 'charmander.png',
  },
];

describe('CartSidebar Component', () => {
  const mockRemovePokemon = vi.fn();
  const mockClearTeam = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementation
    usePokemonStore.mockImplementation((selector) => {
      const store = {
        pokemons: mockPokemons,
        removePokemon: mockRemovePokemon,
        clearTeam: mockClearTeam,
      };
      return selector(store);
    });
  });

  it('should render empty state when no pokemons', () => {
    usePokemonStore.mockImplementation((selector) => {
      const store = {
        pokemons: [],
        removePokemon: mockRemovePokemon,
        clearTeam: mockClearTeam,
      };
      return selector(store);
    });

    render(<CartSidebar />);

    expect(screen.getByText('Nenhum Pokémon selecionado')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-team-button')).toBeDisabled();
  });

  it('should render pokemon list correctly', () => {
    render(<CartSidebar />);

    mockPokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      expect(screen.getByText(pokemon.characteristic)).toBeInTheDocument();
    });
  });

  it('should call removePokemon when clicking remove button', () => {
    render(<CartSidebar />);

    const removeButtons = screen.getAllByTestId('remove-pokemon-button');
    fireEvent.click(removeButtons[0]);

    expect(mockRemovePokemon).toHaveBeenCalledWith(mockPokemons[0].id);
  });

  it('should show confirmation modal when clicking confirm team', () => {
    render(<CartSidebar />);

    const confirmButton = screen.getByTestId('confirm-team-button');
    fireEvent.click(confirmButton);

    expect(screen.getByText('Equipe formada')).toBeInTheDocument();
    expect(screen.getByText('Sua equipe está pronta!')).toBeInTheDocument();
  });

  it('should clear team when starting new team from modal', () => {
    render(<CartSidebar />);

    // Abrir modal
    const confirmButton = screen.getByTestId('confirm-team-button');
    fireEvent.click(confirmButton);

    // Clicar em começar nova equipe
    const startNewButton = screen.getByTestId('start-new-team-button');
    fireEvent.click(startNewButton);

    expect(mockClearTeam).toHaveBeenCalledTimes(1);
  });

  it('should close modal without clearing team', () => {
    render(<CartSidebar />);

    // Abrir modal
    const confirmButton = screen.getByTestId('confirm-team-button');
    fireEvent.click(confirmButton);

    // Fechar modal
    const closeButton = screen.getByTestId('modal-close-button');
    fireEvent.click(closeButton);

    expect(mockClearTeam).not.toHaveBeenCalled();
    expect(screen.queryByText('Equipe formada')).not.toBeInTheDocument();
  });
});
