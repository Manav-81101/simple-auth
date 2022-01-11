import { types, onSnapshot } from "mobx-state-tree";
import axios from "axios";
import React from "react";
export const Pokemon = types
  .model("Pokemon", {
    id: types.identifierNumber,
    name: types.string,
    image: types.string,
    favorite: false,
  })
  .actions((self) => ({
    toggleFavorite() {
      self.favorite = !self.favorite;
    },
  }));

export const PokemonStore = types
  .model("PokemonStore", {
    pokemon: types.array(Pokemon),
  })
  .views((self) => ({
    get pokemonType() {
      return {
        favorite: self.pokemon.filter((pokemon) => pokemon.favorite).length,
        notFavorite: self.pokemon.filter((pokemon) => !pokemon.favorite).length,
      };
    },
    get favoritePokemon() {
      return self.pokemon.filter((pokemon) => pokemon.favorite);
    },
  }))
  .actions((self) => {
    return {
      async loadPokemon() {
        try {
          if (self.pokemon.length === 0) {
            const { data } = await axios.get(
              "https://pokeapi.co/api/v2/pokemon/?limit=151"
            );

            data.results.forEach((pokemon) => {
              this.addPokemon({
                id: parseInt(pokemon.url.split("/")[6]),
                name: pokemon.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/")[6]
                }.png`,
                favorite: false,
              });
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
      addPokemon(pokemon) {
        self.pokemon.push(Pokemon.create(pokemon));
      },
    };
  });

export const pokemonStore = PokemonStore.create({ pokemon: [] });
export const Context = React.createContext(pokemonStore);
