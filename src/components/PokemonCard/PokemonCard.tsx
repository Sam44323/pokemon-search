import React from "react";
import styles from "./PokemonCard.module.scss";

interface PokemonCardProps {
  height: number;
  weight: number;
  image: string;
  index: number;
}

const PokemonCard: React.FC<PokemonCardProps> = (props) => {
  return (
    <div className={styles.PokemonCardContainer}>
      <img src={props.image} alt={props.index} />
    </div>
  );
};

export default PokemonCard;
