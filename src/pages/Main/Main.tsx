import React from "react";
import { useRoutes } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import styles from "./Main.module.scss";
import PokemonList from "../../data/pokemondata.json";

const Main: React.FC = () => {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [suggestedData, setSuggestedData] = React.useState<
    { name: string; url: string }[]
  >([]);

  const handleSearchInput = (value: string) => {
    setSearchInput(value);
    let filteredData: { name: string; url: string }[] = [];
    if (value === "") {
      filteredData = [];
    } else {
      filteredData = PokemonList.results.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    setSuggestedData(filteredData);
  };

  const handleSearch = () => {};

  return (
    <div className={styles.MainContainer}>
      <section className={styles.SearchContainer}>
        <div className={styles.Inputs}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<BsSearch />} />
            <Input
              type="text"
              placeholder="pokemon name"
              value={searchInput}
              onChange={(e) => handleSearchInput(e.target.value)}
            />
          </InputGroup>
          <Button
            className={styles.Button}
            colorScheme="green"
            variant="solid"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        {suggestedData.length > 0 && (
          <div className={styles.SuggestionModals}>
            {suggestedData.map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  setSearchInput(item.name);
                  setSuggestedData([]);
                }}
              >
                {item.name}
              </p>
            ))}
          </div>
        )}
      </section>
      <section className={styles.PokemonContainer}></section>
    </div>
  );
};

export default Main;
