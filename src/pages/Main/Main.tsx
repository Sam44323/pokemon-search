import React from "react";
import {useRoutes} from 'react-router-dom'
import styles from "./Main.module.scss";

const Main: React.FC = () => {
  return <div className={styles.MainContainer}>
    <section className={styles.SearchContainer}></section>
    <section className={styles.PokemonContainer}></section>
  </div>;
};

export default Main;
