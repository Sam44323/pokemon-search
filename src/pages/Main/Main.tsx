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

const Main: React.FC = () => {
  const [searchInput, setSearchInput] = React.useState<string>("");

  const handleSearch = () => {};

  return (
    <div className={styles.MainContainer}>
      <section className={styles.SearchContainer}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<BsSearch />} />
          <Input
            type="text"
            placeholder="news title"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
      </section>
      <section className={styles.PokemonContainer}></section>
    </div>
  );
};

export default Main;
