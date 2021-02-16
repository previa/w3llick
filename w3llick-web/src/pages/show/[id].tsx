import {
  Heading,
  Image,
  Text,
  Flex,
  Box,
  Button,
  CircularProgress,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter, Router } from "next/router";
import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { SeasonHolder } from "../../components/SeasonHolder";
import {
  useEpisodesQuery,
  useShowQuery,
  useAddEpisodesMutation,
  Episode,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

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

  const [{ data: epData, fetching: epFetching }, reload] = useEpisodesQuery({
    variables: {
      id: intId,
    },
  });

  const [, update] = useAddEpisodesMutation();

  const [variables] = useState({
    imageURL: "https://image.tmdb.org/t/p/w200",
  });

  const getThumbnail = (path: string | null | undefined): any => {
    const _path = variables.imageURL + path;

    return <Image mt={2} p={2} src={_path}></Image>;
  };

  const updateShow = async () => {
    const _episodes = await update({
      tmdb_id: data?.show?.tmdb_id as number,
    });

    // TODO: FIX IT
    router.reload();
  };

  if (fetching || epFetching) {
    return (
      <Layout>
          <Flex>
            <CircularProgress isIndeterminate color="green.300" />
          </Flex>
      </Layout>
    );
  }

  if (data?.show && epData?.episodes) {
    let _seasons = [];

    for (let i = 1; i < data.show.number_of_seasons + 1; i++) {
      _seasons[i] = epData.episodes.filter((e) => {
        return e.season_number === i;
      });

      _seasons[i].sort((a, b) => {
        return b.episode_number - a.episode_number;
      });
    }

    return (
      <Layout>
        <Heading>{data?.show?.name}</Heading>
        <Text>TMDB ID: {data.show.tmdb_id}</Text>
        <Text>{"(" + data?.show?.first_air_date.split("-")[0] + ")"}</Text>
        <Flex>
          {getThumbnail(data.show.poster_path)}
          <Box>
            <Text ml={2} mt={2}>
              {data?.show.overview}
            </Text>
            <Button onClick={updateShow} ml={2} mt={2} colorScheme="teal">
              Update show
            </Button>
          </Box>
        </Flex>
        <Flex>
          <SeasonHolder seasons={_seasons}></SeasonHolder>
        </Flex>
        <Box mb={5}></Box>
      </Layout>
    );
  } else {
    return <div>Show not found</div>;
  }
};

export default withUrqlClient(createUrqlClient)(Show);
