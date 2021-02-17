import { AddIcon, PlusSquareIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Button,
  Input,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Flex,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { VariablesAreInputTypesRule } from "graphql";
import { withUrqlClient } from "next-urql";
import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import {
  SearchShow,
  useSearchShowMutation,
  useAddShowMutation,
  useAddEpisodesMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";

interface addShowProps {}

const AddShow: React.FC<addShowProps> = ({}) => {
  const [variables, setVariables] = useState({
    title: "" as string,
    shows: {} as SearchShow[],
    imageURL: "https://image.tmdb.org/t/p/w200",
  });

  const router = useRouter();

  const [{ fetching }, searchShow] = useSearchShowMutation();
  const [, add] = useAddShowMutation();
  const [, addEpisodes] = useAddEpisodesMutation();

  const handleChange = (e: any) => {
    setVariables({
      ...variables,
      title: e.target.value,
    });
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        getShows();
        document.getElementById("searchBtn")?.focus();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  const getShows = async () => {
    const _seasons = await searchShow({
      title: variables.title,
    });

    const _res = _seasons!.data!.searchShow!.results;

    setVariables({
      ...variables,
      shows: _res,
    });
  };

  const getThumbnail = (path: string | null | undefined): any => {
    const _path = variables.imageURL + path;

    return <img src={_path}></img>;
  };

  const addShow = async (e: any) => {
    const _tmdb_id = parseInt(e.target.value) as number;
    const _show = await add({
      tmdb_id: _tmdb_id,
    });

    console.log(_show);

    const _episodes = await addEpisodes({
      tmdb_id: _tmdb_id,
    });

    setVariables({
      ...variables,
      shows: [],
      title: "",
    });

    const _element = document.getElementById("title") as HTMLInputElement;
    _element.value = "";
  };

  return (
    <Layout variant="regular">
      <Box>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input id="title" placeholder="Title" onChange={handleChange}></Input>
        </InputGroup>
        <Button
          isLoading={fetching}
          p={2}
          mt={2}
          id="searchBtn"
          colorScheme="teal"
          onClick={getShows}
        >
          Search show
        </Button>
      </Box>
      {typeof variables.shows.length !== "undefined" && (
        <Grid templateColumns="repeat(1,1fr)" p={2} mt={4} gap={5}>
          {variables.shows.map((show) => {
            return (
              <GridItem key={show.id} p={2} shadow="md" borderWidth="2px">
                <Flex>
                  {show.poster_path !== null && (
                    <Box w="200px" boxShadow="dark-lg" mr={2}>
                      {getThumbnail(show.poster_path)}
                    </Box>
                  )}
                  <Box flex="1">
                    <Heading>{show.name}</Heading>
                    <Text>
                      {"(" + show.first_air_date?.split("-")[0] + ")"}
                    </Text>
                    <Text mt={2}>{show.overview}</Text>
                  </Box>
                </Flex>
                <Button
                  value={show.id}
                  onClick={addShow}
                  mt={2}
                  colorScheme="teal"
                  p={2}
                >
                  <AddIcon mr={2} />
                  Add
                </Button>
              </GridItem>
            );
          })}
        </Grid>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(AddShow);
