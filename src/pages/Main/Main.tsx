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
import axios from "../../axios.config";

const Main: React.FC = () => {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [resultData, setResultData] = React.useState<[]>([]);
  const [pageData, setPageData] = React.useState<{
    currPage: number;
    totalPage: number;
  }>({
    currPage: 1,
    totalPage: 1,
  });
  const [suggestionLoader, setSuggestionLoader] =
    React.useState<boolean>(false);
  const toast = useToast();
  const [suggestedData, setSuggestedData] = React.useState<
    { name: string; url: string }[]
  >([]);

  const handleSearchInput = (value: string) => {
    setSuggestionLoader(true);
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
    setSuggestionLoader(false);
  };

  React.useEffect(() => {
    const fetchPokeData = async () => {
      const { data } = await axios.get("?limit=20&offset=0");
      console.log(data);
    };
    fetchPokeData();
  }, []);

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
        {suggestedData.length > 0 ? (
          <div className={styles.SuggestionModals}>
            {suggestionLoader && <Spinner color="white" />}
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
        ) : (
          <></>
        )}
      </section>
      <section className={styles.PokemonContainer}></section>
      <section className={styles.PaginationContainer}>
        <button className={styles.PageButton}> Prev </button>
        <p>
          Page {pageData.currPage} of {pageData.totalPage}
        </p>
        <button className={styles.PageButton}> Next </button>
      </section>
    </div>
  );
};

export default Main;
