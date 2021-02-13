import {
  Heading,
  Image,
  Text,
  Flex,
  Box,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { SeasonHolder } from "../../components/SeasonHolder";
import { useEpisodesQuery, useShowQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { getPosterPath } from "../../utils/getPosterPath";

const Show = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = useShowQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (data?.show) {
    const seasons = data.show.totalSeasons as number;

    return (
      <Layout>
        <Heading>{data?.show?.title}</Heading>
        <Text>{"(" + data?.show?.year + ")"}</Text>
        <Flex>
          <Image
            mt={2}
            w="30%"
            src={getPosterPath(data?.show?.id as number)}
          ></Image>
          <Box>
            <Text ml={2} mt={2}>
              {data?.show.plot}
            </Text>
            <Text ml={2} mt={2}>
              Language: {data?.show.language}
            </Text>
            <Text ml={2} mt={2}>
              IMDB ID: {data?.show.imdbID}
            </Text>
            <Text ml={2} mt={2}>
              Seasons: {data?.show.totalSeasons}
            </Text>
            <Button ml={2} colorScheme="teal">
              Update show
            </Button>
          </Box>
        </Flex>
        <Flex>
          <SeasonHolder seasons={seasons} showID={data.show.id}></SeasonHolder>
        </Flex>
      </Layout>
    );
  } else {
    return <div>Show not found</div>;
  }
};

export default withUrqlClient(createUrqlClient)(Show);
