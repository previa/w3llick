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
import React, { useState } from "react";
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

  const [variables] = useState({
    imageURL: "https://image.tmdb.org/t/p/w200",
  });

  const getThumbnail = (path: string | null | undefined): any => {
    const _path = variables.imageURL + path;

    return <Image mt={2} p={2} src={_path}></Image>;
  };

  if (fetching) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (data?.show) {
    const seasons = data.show.number_of_seasons as number;

    return (
      <Layout>
        <Heading>{data?.show?.name}</Heading>
        <Text>{"(" + data?.show?.first_air_date.split("-")[0] + ")"}</Text>
        <Flex>
          {getThumbnail(data.show.poster_path)}
          <Box>
            <Text ml={2} mt={2}>
              {data?.show.overview}
            </Text>
            <Text ml={2} mt={2}>
              Seasons: {data?.show.number_of_seasons}
            </Text>
            <Button ml={2} mt={2} colorScheme="teal">
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
