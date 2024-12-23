import { useState } from 'react';

import ConfirmationModal from '../ConfirmationModal';

import { usePokemonStore } from '@/store/pokemon';
import './index.scss';

const CartSidebar = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const pokemons = usePokemonStore((state) => state.pokemons);
  const removePokemon = usePokemonStore((state) => state.removePokemon);
  const clearTeam = usePokemonStore((state) => state.clearTeam);

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handleStartNew = () => {
    clearTeam();
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="cart-sidebar">
        <h2 className="cart-sidebar__title">Sua equipe</h2>

        <div className="cart-sidebar__items">
          {pokemons && pokemons.length > 0 ? (
            pokemons.map((item) => (
              <div className="cart-sidebar__item" key={item.id}>
                <div className="cart-sidebar__item-info">
                  <div className="cart-sidebar__item-header">
                    <p className="cart-sidebar__item-x">x</p>
                    <p className="cart-sidebar__item-name">{item.name}</p>
                    <button
                      className="cart-sidebar__remove-button"
                      data-testid="remove-pokemon-button"
                      onClick={() => removePokemon(item.id)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="cart-sidebar__item-characteristic">
                    <span>{item.characteristic}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="cart-sidebar__empty-message">
              Nenhum Pokémon selecionado
            </p>
          )}
        </div>

        <div className="cart-sidebar__footer">
          <button
            className="cart-sidebar__checkout-button"
            data-testid="confirm-team-button"
            disabled={pokemons.length === 0}
            onClick={handleConfirm}
          >
            Confirmar equipe
          </button>
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationModal
          items={pokemons}
          onClose={() => setShowConfirmation(false)}
          onStartNew={handleStartNew}
        />
      )}
    </>
  );
};

export default CartSidebar;
