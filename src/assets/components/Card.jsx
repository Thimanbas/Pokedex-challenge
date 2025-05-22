import React from "react";
import "./Card.css";
const typeMap = new Map([
  [
    "bug",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/BugIC_Big.png",
  ],
  [
    "dark",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/DarkIC_Big.png",
  ],
  [
    "dragon",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/DragonIC_Big.png",
  ],
  [
    "electric",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/ElectricIC_Big.png",
  ],
  [
    "fairy",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/FairyIC_Big.png",
  ],
  [
    "fighting",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/FightingIC_Big.png",
  ],
  [
    "fire",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/FireIC_Big.png",
  ],
  [
    "flying",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/FlyingIC_Big.png",
  ],
  [
    "ghost",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/GhostIC_Big.png",
  ],
  [
    "grass",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/GrassIC_Big.png",
  ],
  [
    "ground",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/GroundIC_Big.png",
  ],
  [
    "ice",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/IceIC_Big.png",
  ],
  [
    "normal",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/NormalIC_Big.png",
  ],
  [
    "poison",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/PoisonIC_Big.png",
  ],
  [
    "psychic",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/PsychicIC_Big.png",
  ],
  [
    "rock",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/RockIC_Big.png",
  ],
  [
    "steel",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/SteelIC_Big.png",
  ],
  [
    "water",
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/WaterIC_Big.png",
  ],
  [
    null,
    "https://storage.googleapis.com/pokedex-ficha/Images/Types/noneIC_Big.png",
  ],
]);

const Card = ({ id, name, image, types, onClick }) => {
  return (
    <>
      <div className="card" onClick={onClick} style={{ cursor: "pointer" }}>
        <div className="card__container">
          <div className="card__id">#{id}</div>
          <div className="card__image-container">
            <img className="card-image" src={image} alt={name}></img>
          </div>
          <div className="card__name">{name}</div>
          <div
            className={`card__types-container ${
              types.length === 1 ? "single-type" : "dual-type"
            }`}
          >
            {types.map((type) => {
              const iconSrc = typeMap.get(type) || typeMap.get(null);
              return (
                <img
                  key={type}
                  src={iconSrc}
                  alt={type}
                  className="type-icon"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
