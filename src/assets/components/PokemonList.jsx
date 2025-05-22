// PokemonList.jsx
import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

const PokemonList = ({ onCardClick }) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    // função assíncrona para buscar os 10 primeiros Pokémon
    const fetchPokemons = async () => {
      const data = [];

      for (let i = 1; i <= 50; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const json = await res.json();
        data.push({
          id: json.id,
          name: json.name,
          image: json.sprites.other["official-artwork"].front_default,
          types: json.types.map((t) => t.type.name),
        });
      }

      setPokemons(data);
    };

    fetchPokemons();
  }, []);

  return (
    <>
      {pokemons.map((p) => (
        <Card
          key={p.id}
          id={p.id}
          name={p.name}
          image={p.image}
          types={p.types}
          onClick={() => onCardClick(p.id)}
        />
      ))}
    </>
  );
};

export default PokemonList;
