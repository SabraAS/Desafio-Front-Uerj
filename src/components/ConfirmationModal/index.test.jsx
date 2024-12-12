import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ConfirmationModal from './index';

const mockItems = [
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

describe('ConfirmationModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnStartNew = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render modal with correct title and subtitle', () => {
    render(
      <ConfirmationModal
        items={mockItems}
        onClose={mockOnClose}
        onStartNew={mockOnStartNew}
      />,
    );

    expect(screen.getByText('Equipe formada')).toBeInTheDocument();
    expect(screen.getByText('Sua equipe está pronta!')).toBeInTheDocument();
  });

  it('should render all pokemon items correctly', () => {
    render(
      <ConfirmationModal
        items={mockItems}
        onClose={mockOnClose}
        onStartNew={mockOnStartNew}
      />,
    );

    mockItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.characteristic)).toBeInTheDocument();
      expect(screen.getByAltText(item.name)).toHaveAttribute('src', item.image);
    });
  });

  it('should display correct total of pokemons', () => {
    render(
      <ConfirmationModal
        items={mockItems}
        onClose={mockOnClose}
        onStartNew={mockOnStartNew}
      />,
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Total de pokemons na equipe')).toBeInTheDocument();
  });

  it('should call onClose when clicking close button', () => {
    render(
      <ConfirmationModal
        items={mockItems}
        onClose={mockOnClose}
        onStartNew={mockOnStartNew}
      />,
    );

    const closeButton = screen.getByTestId('modal-close-button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onStartNew when clicking start new team button', () => {
    render(
      <ConfirmationModal
        items={mockItems}
        onClose={mockOnClose}
        onStartNew={mockOnStartNew}
      />,
    );

    const startNewButton = screen.getByTestId('start-new-team-button');
    fireEvent.click(startNewButton);

    expect(mockOnStartNew).toHaveBeenCalledTimes(1);
  });
});
