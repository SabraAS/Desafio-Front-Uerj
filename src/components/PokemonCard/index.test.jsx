import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import PokemonCard from './index';

const mockPokemon = {
  name: 'Bulbasaur',
  image: 'bulbasaur.png',
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  abilities: [
    { ability: { name: 'overgrow' } },
    { ability: { name: 'chlorophyll' } },
  ],
  characteristic: 'Takes plenty of siestas',
};

describe('PokemonCard Component', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render pokemon information correctly', () => {
    render(
      <PokemonCard
        abilities={mockPokemon.abilities}
        characteristic={mockPokemon.characteristic}
        image={mockPokemon.image}
        name={mockPokemon.name}
        onClick={mockOnClick}
        types={mockPokemon.types}
      />,
    );

    // Verifica nome
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();

    // Verifica característica
    expect(
      screen.getByText(`Característica: ${mockPokemon.characteristic}`),
    ).toBeInTheDocument();

    // Verifica tipos
    expect(screen.getByText('Tipos: grass, poison')).toBeInTheDocument();

    // Verifica habilidades
    expect(
      screen.getByText('Habilidades: overgrow, chlorophyll'),
    ).toBeInTheDocument();

    // Verifica imagem
    const image = screen.getByAltText(mockPokemon.name);
    expect(image).toHaveAttribute('src', mockPokemon.image);
  });

  it('should call onClick when add button is clicked', () => {
    render(
      <PokemonCard
        abilities={mockPokemon.abilities}
        characteristic={mockPokemon.characteristic}
        image={mockPokemon.image}
        name={mockPokemon.name}
        onClick={mockOnClick}
        types={mockPokemon.types}
      />,
    );

    const addButton = screen.getByTestId(
      `add-pokemon-${mockPokemon.name.toLowerCase()}`,
    );
    fireEvent.click(addButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should disable add button when disabled prop is true', () => {
    render(
      <PokemonCard
        abilities={mockPokemon.abilities}
        characteristic={mockPokemon.characteristic}
        disabled
        image={mockPokemon.image}
        name={mockPokemon.name}
        onClick={mockOnClick}
        types={mockPokemon.types}
      />,
    );

    const addButton = screen.getByTestId(
      `add-pokemon-${mockPokemon.name.toLowerCase()}`,
    );
    expect(addButton).toHaveAttribute('disabled');

    fireEvent.click(addButton);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should show "não possui" when characteristic is not provided', () => {
    render(
      <PokemonCard
        abilities={mockPokemon.abilities}
        image={mockPokemon.image}
        name={mockPokemon.name}
        onClick={mockOnClick}
        types={mockPokemon.types}
      />,
    );

    expect(screen.getByText('Característica: não possui')).toBeInTheDocument();
  });

  it('should handle empty types and abilities arrays', () => {
    render(
      <PokemonCard
        abilities={[]}
        image={mockPokemon.image}
        name={mockPokemon.name}
        onClick={mockOnClick}
        types={[]}
      />,
    );

    expect(screen.getByText('Tipos: não possui')).toBeInTheDocument();
    expect(screen.getByText('Habilidades: não possui')).toBeInTheDocument();
  });
});
