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
import { Episode } from "../generated/graphql";

interface SeasonHolderProps {
  seasons: any[];
}

export const SeasonHolder: React.FC<SeasonHolderProps> = ({
  seasons,
}) => {
  const currentDate = new Date();

  const getEpisodeColor = (date: string): string => {
    const epDate = new Date(date);
    if(epDate < currentDate) {
      return "red.200";
    } else {
      return "yellow.500";
    }
  }

  const getAirDateToString = (date: string): string => {
    const epDate = new Date(date);
    // TODO: DO DECENT TIME MANAGEMENT
    if(epDate.toDateString() === 'Invalid Date') {
      return "Unkown"
    }
    return epDate.toDateString();
  }

  if (seasons) {
    return (
      <Grid mt={2} w="100%" templateColumns="repeat(1,1fr)" gap={5}>
        {seasons.reverse().map((s, index) => {
          return (
            <GridItem
              key={"season" + (seasons.length - index - 1)}
              p={2}
              shadow="dark-lg"
              borderWidth="2px"
            >
              <Heading mt={2} mb={2} ml={2}>
                {"Season " + (seasons.length - index - 1)}
              </Heading>
              <Table size="sm" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Title</Th>
                    <Th>Aired</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {s.map((ep: Episode) => {
                    return (
                      <Tr backgroundColor={getEpisodeColor(ep.air_date)} key={ep.tmdb_id}>
                        <Td>{ep.episode_number}</Td>
                        <Td>{ep.name}</Td>
                        <Td>{getAirDateToString(ep.air_date)}</Td>
                        <Td></Td>
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
