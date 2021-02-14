import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { useShowsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import {
  Heading,
  Link,
  Grid,
  GridItem,
  Text,
  Flex,
  Image,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Router, useRouter } from "next/router";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 12,
    cursor: null as null | string,
    imageURL: "https://image.tmdb.org/t/p/w400",
  });
  const [{ data, fetching }] = useShowsQuery({
    variables,
  });

  const getThumbnail = (path: string | null | undefined): any => {
    const _path = variables.imageURL + path;
    const _style = "outline";

    return <Image src={_path}></Image>;
  };

  const router = useRouter();

  if (!fetching && !data) {
    return <div>No shows available</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Grid templateColumns="repeat(3,1fr)" gap={5}>
          {data!.shows.shows.map((s) => (
            <GridItem p={2} key={s.id} shadow="md" borderWidth="2px">
              <Link href={"/show/" + s.id}>
                {getThumbnail(s.poster_path)}
                <Box>
                  <Heading mt={2} fontSize="m">
                    {s.name}
                  </Heading>
                  <Text mt={4}>{s.first_air_date.split("-")[0]}</Text>
                </Box>
              </Link>
            </GridItem>
          ))}
        </Grid>
      )}
      {data && data.shows.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                ...variables,
                limit: variables.limit,
                cursor: data.shows.shows[data.shows.shows.length - 1].name,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={4}
            colorScheme="teal"
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
