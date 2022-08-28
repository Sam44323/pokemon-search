import React from "react";
import styles from "./Pokemon.module.scss";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "../../axios.config";

const Pokemon: React.FC = (props) => {
  const [pokeData, setPokeData] = React.useState<any>({});
  const toast = useToast();
  const params = useParams();

  React.useEffect(() => {
    toast.closeAll();
    toast({
      title: "Fetching the data...",
      status: "loading",
      position: "top",
    });
    const fetchPokeData = async () => {
      try {
        const data = await axios.get(`${params.name}`);
        setPokeData(data.data);
        toast.closeAll();
      } catch (err) {
        console.log(err);
        toast.closeAll();
        toast({
          title: "Error while fetching data, please try again!",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchPokeData();
  }, []);

  return Object.keys(pokeData).length > 0 ? (
    <div className={styles.PokemonContainer}>
      <section className={styles.RootData}>
        <div className={styles.ImageContainer}>
          <img src={pokeData.sprites.front_default} alt="" />
        </div>
        <div className={styles.Data}>
          <h1>{pokeData.name}</h1>
          <div>
            <p>Weight: {pokeData.weight}</p>
            <p>Height: {pokeData.height}</p>
          </div>
        </div>
      </section>
      <section className={styles.ListData}>
        <h1>Abilities</h1>
        <div className={styles.Lists}>
          {pokeData.abilities.map(
            (item: { ability: { name: string } }, index: number) => (
              <p key={index}>{item.ability.name}</p>
            )
          )}
        </div>
      </section>
      <section className={styles.ListData}>
        <h1>Moves</h1>
        <div className={styles.Lists}>
          {pokeData.moves.map(
            (item: { move: { name: string } }, index: number) => (
              <p key={index}>{item.move.name}</p>
            )
          )}
        </div>
      </section>
      <section className={styles.ListData}>
        <h1>Stats</h1>
        <div className={styles.Lists}>
          {pokeData.stats.map(
            (
              item: {
                base_stat: number;
                effort: number;
                stat: { name: string };
              },
              index: number
            ) => (
              <p key={index}>
                <span>{item.stat.name}</span> : {item.base_stat}
              </p>
            )
          )}
        </div>
      </section>
    </div>
  ) : (
    <></>
  );
};

export default Pokemon;
