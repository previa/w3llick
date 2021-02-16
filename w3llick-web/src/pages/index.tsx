import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { useShowsQuery, Show } from "../generated/graphql";
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
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { Router, useRouter } from "next/router";
import { SearchIcon } from "@chakra-ui/icons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 100,
    cursor: null as null | string,
    imageURL: "https://image.tmdb.org/t/p/w400",
    shows: [] as Show[],
    search: "" as string,
  });

  const [{ data, fetching }] = useShowsQuery({
    variables,
  });

  const search = (e: any) => {
    const val = e.target.value.toLowerCase() as string;

    const res = data?.shows.shows.filter((show) => {
      return show.name.toLowerCase().indexOf(val) > -1;
    }) as Show[];

    console.log(res);

    setVariables({
      ...variables,
      shows: res,
    });
  };

  const getThumbnail = (path: string | null | undefined): any => {
    const _path = variables.imageURL + path;
    const _style = "outline";

    return <Image src={_path}></Image>;
  };

  const router = useRouter();

  if (!fetching && !data) {
    return <div>No shows available</div>;
  }

  let shows = [] as Show[];
  if (data && variables.shows.length === 0) {
    shows = data.shows.shows;
  } else if (variables.shows.length > 0) {
    shows = variables.shows;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <>
          <Box>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input autoComplete="off"
                onChange={search}
                mb={2}
                placeholder="Title"
                id="title"
                name="title"
              ></Input>
            </InputGroup>
          </Box>{" "}
          <Grid templateColumns="repeat(3,1fr)" gap={5} mb={10}>
            {shows.map((s) => (
              <GridItem
                value={s.id}
                p={2}
                key={s.id}
                shadow="md"
                borderWidth="2px"
              >
                <Link style={{ textDecoration: "none" }} href={"/show/" + s.id}>
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
        </>
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
