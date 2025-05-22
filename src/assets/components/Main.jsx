import React, { useState } from "react";
import Card from "./Card.jsx";
import PokemonList from "./PokemonList.jsx";
import Header from "./Header.jsx";
import PokemonDetails from "./PokemonDetails.jsx";

const Main = () => {
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleCardClick = (id) => {
    setSelectedId(id);
  };

  const handleBack = () => {
    setSelectedId(null);
  };

  return (
    <>
      <Header setSearchedPokemon={setSearchedPokemon} />
      <div className="main">
        <div className="main__container">
          {selectedId ? (
            <PokemonDetails pokemonId={selectedId} onBack={handleBack} />
          ) : searchedPokemon ? (
            <Card
              id={searchedPokemon.id}
              name={searchedPokemon.name}
              image={searchedPokemon.image}
              types={searchedPokemon.types}
              onClick={() => handleCardClick(searchedPokemon.id)}
            />
          ) : (
            <PokemonList onCardClick={handleCardClick} />
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
