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
    console.log('handleConfirm');
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
          {pokemons.map((item) => (
            <div className="cart-sidebar__item" key={item.id}>
              <div className="cart-sidebar__item-info">
                <div className="cart-sidebar__item-header">
                  <p className="cart-sidebar__item-x">x</p>
                  <p className="cart-sidebar__item-name">{item.name}</p>
                  <button
                    className="cart-sidebar__remove-button"
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
          ))}

          {pokemons.length === 0 && (
            <p className="cart-sidebar__empty-message"></p>
          )}
        </div>

        <div className="cart-sidebar__footer">
          <button
            className="cart-sidebar__checkout-button"
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
