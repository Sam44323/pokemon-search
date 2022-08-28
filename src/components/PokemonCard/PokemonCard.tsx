import React from "react";
import styles from "./PokemonCard.module.scss";

interface PokemonCardProps {
  height: number;
  weight: number;
  image: string;
}

const PokemonCard: React.FC<PokemonCardProps> = (props) => {
  return <div className={styles.PokemonCardContainer}></div>;
};

export default PokemonCard;
