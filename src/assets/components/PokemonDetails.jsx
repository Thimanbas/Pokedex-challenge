// PokemonDetails.jsx
import React, { useEffect, useState } from "react";
import "./PokemonDetails.css";

/* ---------- MAPA DE ÍCONES DE TIPO ---------- */
const typeMap = new Map([
  [
    "bug",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/BugIC_SV.png",
  ],
  [
    "dark",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/DarkIC_SV.png",
  ],
  [
    "dragon",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/DragonIC_SV.png",
  ],
  [
    "electric",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/ElectricIC_SV.png",
  ],
  [
    "fairy",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/FairyIC_SV.png",
  ],
  [
    "fighting",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/FightingIC_SV.png",
  ],
  [
    "fire",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/FireIC_SV.png",
  ],
  [
    "flying",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/FlyingIC_SV.png",
  ],
  [
    "ghost",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/GhostIC_SV.png",
  ],
  [
    "grass",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/GrassIC_SV.png",
  ],
  [
    "ground",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/GroundIC_SV.png",
  ],
  [
    "ice",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/IceIC_SV.png",
  ],
  [
    "normal",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/NormalIC_SV.png",
  ],
  [
    "poison",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/PoisonIC_SV.png",
  ],
  [
    "psychic",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/PsychicIC_SV.png",
  ],
  [
    "rock",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/RockIC_SV.png",
  ],
  [
    "steel",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/SteelIC_SV.png",
  ],
  [
    "water",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/WaterIC_SV.png",
  ],
  [
    null,
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/noneIC_SV.png",
  ],
]);

const PokemonDetails = ({ pokemonId, onBack }) => {
  const [pokemon, setPokemon] = useState(null);
  const [damageMultipliers, setDamageMultipliers] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await res.json();

      /* ---------- 1. ABILITIES COM DESCRIÇÃO ---------- */
      const abilities = await Promise.all(
        data.abilities.map(async (a) => {
          try {
            const resAb = await fetch(a.ability.url);
            const abData = await resAb.json();
            const entry = abData.effect_entries.find(
              (e) => e.language.name === "en"
            );
            return {
              name: a.ability.name,
              description: entry
                ? entry.short_effect
                : "No description available.",
            };
          } catch {
            return { name: a.ability.name, description: "Failed to load." };
          }
        })
      );

      /* ---------- 2. MULTIPLICADORES DE DANO ---------- */
      const typeDataList = await Promise.all(
        data.types.map(async (t) => {
          const r = await fetch(
            `https://pokeapi.co/api/v2/type/${t.type.name}`
          );
          return await r.json();
        })
      );

      // Inicia todos os tipos com 1x
      const multipliers = {};
      for (const [type] of typeMap) {
        if (type === null) continue; // pula a entrada nula
        multipliers[type] = 1;
      }

      // Ajusta os multiplicadores de acordo com cada tipo do Pokémon
      typeDataList.forEach((typeData) => {
        typeData.damage_relations.double_damage_from.forEach((t) => {
          multipliers[t.name] *= 2;
        });
        typeData.damage_relations.half_damage_from.forEach((t) => {
          multipliers[t.name] *= 0.5;
        });
        typeData.damage_relations.no_damage_from.forEach((t) => {
          multipliers[t.name] *= 0;
        });
      });

      /* ---------- 3. SALVA ESTADOS ---------- */
      setPokemon({
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        types: data.types.map((t) => t.type.name),
        abilities,
        stats: data.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
      });

      setDamageMultipliers(multipliers);
    };

    fetchDetails();
  }, [pokemonId]);

  if (!pokemon) return <div>Carregando...</div>;

  /* ---------- 4. JSX ---------- */
  return (
    <div className="pokemondetails">
      <div className="pokemondetails__info">
        <div className="pokemondetails__name">
          <button onClick={onBack} className="pokemondetails__back-button">
            ←
          </button>
          <h2>
            {pokemon.name} – #{pokemon.id}
          </h2>
        </div>

        <div className="pokemondetails__image">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>

        <div className="pokemondetails__types">
          {pokemon.types.map((t) => {
            const icon = typeMap.get(t) || typeMap.get(null);
            return <img key={t} src={icon} alt={t} className="type-icon" />;
          })}
        </div>

        {/* ---------- TABELA DE ABILITIES ---------- */}
        <div className="pokemondetails__abilities">
          <table className="abilities-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.abilities.map((ab) => (
                <tr key={ab.name}>
                  <td>{ab.name}</td>
                  <td>{ab.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* ---------- TABELA DE DANO ---------- */}
      <div className="pokemondetails__container">
        <div className="pokemondetails__stats-container">
          <div className="pokemondetails__stats">
            {pokemon.stats &&
              pokemon.stats.map((stat) => (
                <div key={stat.name} className="stat-bar">
                  <span className="stat-label">{stat.name.toUpperCase()}</span>
                  <div className="progress">
                    <div
                      className={`progress-fill ${stat.name}`}
                      style={{ width: `${(stat.value / 255) * 100}%` }}
                    >
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="pokemondetails__damage-summary">
          <div className="damage-summary">
            {[...Object.entries(damageMultipliers)]
              .filter(([type, value]) => value !== 1 && typeMap.has(type))
              .sort((a, b) => b[1] - a[1])
              .map(([type, value]) => {
                const icon = typeMap.get(type);
                const className =
                  value === 0
                    ? "damage-x0"
                    : value === 0.25
                    ? "damage-x025"
                    : value === 0.5
                    ? "damage-x05"
                    : value === 2
                    ? "damage-x2"
                    : value === 4
                    ? "damage-x4"
                    : "";

                return (
                  <div key={type} className={`damage-row ${className}`}>
                    <img src={icon} alt={type} className="type-icon" />
                    <span className="multiplier-text">{value}x</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
