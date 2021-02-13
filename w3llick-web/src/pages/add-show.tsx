import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { VariablesAreInputTypesRule } from "graphql";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { SearchShow, useSearchShowMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface addShowProps {}

const AddShow: React.FC<addShowProps> = ({}) => {
  const [variables, setVariables] = useState({
    title: "" as string,
    shows: {} as SearchShow[],
    imageURL: "https://image.tmdb.org/t/p/w200",
  });

  const [, searchShow] = useSearchShowMutation();

  const handleChange = (e: any) => {
    setVariables({
      ...variables,
      title: e.target.value,
    });
  };

  const getThumbnail = (path: string | null | undefined): any => {
    const _path = variables.imageURL + path;

    return <img src={_path}></img>;
  };

  return (
    <Layout variant="regular">
      <Box>
        <Input
          placeholder="Title"
          id="title"
          name="title"
          onChange={handleChange}
        ></Input>
        <Button
          p={2}
          mt={2}
          colorScheme="teal"
          onClick={async () => {
            const _seasons = await searchShow({
              title: variables.title,
            });
            const _res = _seasons!.data!.searchShow!.results;
            setVariables({
              ...variables,
              shows: _res,
            });
            console.log(_res);
          }}
        >
          Search show
        </Button>
      </Box>
      {typeof variables.shows.length !== "undefined" && (
        <Grid templateColumns="repeat(1,1fr)" p={2} mt={4} gap={5}>
          {variables.shows.map((show) => {
            return (
              <GridItem p={2} shadow="md" borderWidth="2px">
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
                <Button mt={2} colorScheme="teal" p={2}>
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
