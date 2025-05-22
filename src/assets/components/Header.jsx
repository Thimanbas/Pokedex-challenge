import React, { useRef, useState } from "react";

const Header = ({ setSearchedPokemon }) => {
  const buttonRef = useRef(null);
  const [input, setInput] = useState("");

  const handleClick = async () => {
    // animação
    const button = buttonRef.current;
    if (button) {
      button.classList.add("spin");
      setTimeout(() => {
        button.classList.remove("spin");
      }, 800);
    }

    if (!input) return;

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`
      );
      if (!res.ok) throw new Error("Pokémon não encontrado");
      const json = await res.json();

      const pokemonData = {
        id: json.id,
        name: json.name,
        image: json.sprites.other["official-artwork"].front_default,
        types: json.types.map((t) => t.type.name),
      };

      setSearchedPokemon(pokemonData);
    } catch (err) {
      alert("Pokémon não encontrado!");
      setSearchedPokemon(null);
    }
  };

  return (
    <div className="header__main">
      <input
        className="header__input"
        placeholder="Nome ou ID do pokemon."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="header__button"
        onClick={handleClick}
        ref={buttonRef}
      ></button>
    </div>
  );
};

export default Header;
