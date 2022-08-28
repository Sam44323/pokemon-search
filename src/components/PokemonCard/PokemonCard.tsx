import React from "react";
import styles from "./PokemonCard.module.scss";

interface PokemonCardProps {
  image: string;
  index: number;
  name: string;
  clickHandler: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = (props) => {
  return (
    <div className={styles.PokemonCardContainer} onClick={props.clickHandler}>
      <section className={styles.ImageContainer}>
        <img src={props.image} alt={`${props.index}`} />
      </section>
      <section className={styles.DataContainer}>
        <h1>{props.name}</h1>
        <p>#{props.index}</p>
      </section>
    </div>
  );
};

export default PokemonCard;
