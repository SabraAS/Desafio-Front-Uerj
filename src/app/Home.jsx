import '@/styles/App.scss';
import './Home.scss';

import CartSidebar from '@/components/CartSidebar';
import PokemonCard from '@/components/PokemonCard';
import { usePokemons } from '@/queries/pokemon';
import { usePokemonStore } from '@/store/pokemon';

function App() {
  const { data: pokemons, isLoading } = usePokemons(40);
  const { pokemons: pokemonsStore, addPokemon } = usePokemonStore();

  return (
    <div className="home">
      <h1 className="home__title">Pokémons</h1>
      <div className="home__list-grid">
        {pokemons &&
          pokemons?.map((pokemon) => (
            <PokemonCard
              abilities={pokemon.abilities}
              characteristic={pokemon.characteristic}
              disabled={pokemonsStore.find((p) => p.id === pokemon.id)}
              image={pokemon.image}
              key={pokemon.id}
              name={pokemon.name}
              onClick={() => {
                console.log('teste');
                addPokemon(pokemon);
              }}
              types={pokemon.types}
            />
          ))}
      </div>
      <CartSidebar />
    </div>
  );
}

export default App;
