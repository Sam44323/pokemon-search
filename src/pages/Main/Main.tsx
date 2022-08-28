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
import PokemonCard from "../../components/PokemonCard/PokemonCard";

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
    toast({
      title: "Fetching all the pokemon datas!",
      status: "loading",
      position: "top",
      isClosable: true,
    });
    const fetchPokeData = async () => {
      try {
        const {
          data: { results, count },
        } = await axios.get("?limit=10&offset=0");
        const resultData: any[] = await Promise.all(
          results.map(async (_: any, index: number) =>
            axios.get("/" + (index + 1 + (pageData.currPage - 1) * 10) + "/")
          )
        );
        setResultData(resultData as []);
        setPageData((prev) => ({ ...prev, totalPage: Math.round(count / 10) }));
        toast.closeAll();
      } catch (err) {
        console.log(err);
        toast.closeAll();
        toast({
          title: "Error while fetching data, please try again!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchPokeData();
  }, []);

  const handleSearch = () => {
    if (searchInput === "") {
      toast({
        title: "Please enter a valid pokemon name",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
      {resultData.length > 0 ? (
        <section className={styles.PokemonContainer}>
          {resultData.map((item: any, index) => (
            <PokemonCard
              key={index}
              index={item.id}
              height={item.data.height}
              weight={item.data.weight}
              image={item.data.sprites.front_default}
            />
          ))}
        </section>
      ) : (
        <></>
      )}
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
