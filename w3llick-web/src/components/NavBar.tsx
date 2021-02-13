import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    // user not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white" mr={2}>
            Register
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Flex align="center">
          <NextLink href="/add-show">
            <Button as={Link} mr={2} colorScheme="teal">
              Add show
            </Button>
          </NextLink>
          <Box mr={4} color="white">
            {data.me.username}
          </Box>
          <Button
            onClick={() => {
              logout();
            }}
            isLoading={logoutFetching}
            variant="link"
          >
            logout
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} p={4} ml={"auto"} bg="black">
      <Flex align="center" m={"auto"} flex={1} maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading color="white">W3llick</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
