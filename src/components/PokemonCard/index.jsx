import './index.scss';
import PropTypes from 'prop-types';

const PokemonCard = ({
  image,
  name,
  types,
  onClick,
  abilities,
  characteristic,
  disabled = false,
}) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-card__image-container">
        <img alt={name} className="pokemon-card__image" src={image} />
        <button
          className="pokemon-card__button"
          disabled={disabled}
          onClick={onClick}
        >
          Adicionar à equipe
        </button>
      </div>
      <div className="pokemon-card__content">
        <p className="pokemon-card__name">{name}</p>
        <p className="pokemon-card__info">
          Característica: {characteristic || 'não possui'}
        </p>
        <p className="pokemon-card__info">
          Tipos: {types.map((item) => item.type.name).join(', ')}
        </p>
        <p className="pokemon-card__info">
          Habilidades: {abilities.map((item) => item.ability.name).join(', ')}
        </p>
      </div>
    </div>
  );
};

PokemonCard.propTypes = {
  characteristic: PropTypes.string,
  abilities: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  types: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default PokemonCard;
