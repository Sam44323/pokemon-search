import React from "react";
import styles from "./PokemonCard.module.scss";

interface PokemonCardProps {
  image: string;
  index: number;
  name: string;
}

const PokemonCard: React.FC<PokemonCardProps> = (props) => {
  console.log(props.index);
  return (
    <div className={styles.PokemonCardContainer}>
      <section className={styles.ImageContainer}>
        <img src={props.image} alt={props.index} />
      </section>
      <section className={styles.DataContainer}>
        <h1>{props.name}</h1>
        <p>#{props.index}</p>
      </section>
    </div>
  );
};

export default PokemonCard;
