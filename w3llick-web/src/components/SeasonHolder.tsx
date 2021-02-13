import {
  Grid,
  Text,
  GridItem,
  Heading,
  Box,
  Table,
  Th,
  Thead,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";
import React from "react";
import { Episode, EpisodesQuery, useEpisodesQuery } from "../generated/graphql";

interface SeasonHolderProps {
  seasons: number;
  showID: number;
}

export const SeasonHolder: React.FC<SeasonHolderProps> = ({
  seasons,
  showID,
}) => {
  console.log(seasons, " and ", showID);

  const [{ data, fetching }] = useEpisodesQuery({
    variables: {
      id: showID,
    },
  });

  if (fetching) {
    return (
      <div>
        <Text>Loading...</Text>
      </div>
    );
  }

  if (data?.episodes) {
    let _seasons = [];

    for (let i = 1; i < seasons + 1; i++) {
      _seasons[i] = data.episodes
        .filter((e) => {
          return e.season === i;
        })
        .sort((a, b) => 0 - (a.episode < b.episode ? 1 : -1));
    }

    return (
      <Grid mt={2} w="100%" templateColumns="repeat(1,1fr)" gap={5}>
        {_seasons.map((s, index) => {
          return (
            <GridItem
              key={"season" + index}
              p={2}
              shadow="dark-lg"
              borderWidth="2px"
            >
              <Heading mt={2} mb={2} ml={2}>
                {"Season " + index}
              </Heading>
              <Table size="sm" variant="striped" colorScheme="messenger">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Title</Th>
                    <Th>Aired</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {s.map((ep) => {
                    return (
                      <Tr key={ep.imdbID}>
                        <Td>{ep.episode}</Td>
                        <Td>{ep.title}</Td>
                        <Td>{ep.releaseDate}</Td>
                        <Td>1080p</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </GridItem>
          );
        })}
      </Grid>
    );
  }

  return <div>Somthing went wrong...</div>;
};
