import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  TagLabel,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { SettingsIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useSettingsQuery, useSetSettingsMutation } from "../generated/graphql";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const [state, setState] = useState({
    tmdb_key: ""
  });

  const [{ data, fetching }] = useSettingsQuery();

  const [, setSettings] = useSetSettingsMutation();

  const changeKey = (e: any) => {
    data!.settings!.tmdb_key = e.target.value;

    setState({
      tmdb_key: e.target.value
    })
  }

  const saveSettings = async () => {
    const _settings = {
      tmdb_key: state.tmdb_key
    }

    const settings = await setSettings(_settings);
  }

  if (fetching) {
    return <div>Loading...</div>;
  }

  if (data?.settings) {
    return (
      <Layout>
        <Box>
          <Heading>Settings</Heading>
          <Box mt={2}>
            <FormLabel>TMDB Key:</FormLabel>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SettingsIcon color="gray.300" />}
              />
              <Input
                mb={2}
                placeholder="TMDB Key"
                id="tmdb_key"
                name="tmdb_key"
                value={data.settings.tmdb_key as string | number}
                onChange={changeKey}
              ></Input>
            </InputGroup>
          </Box>
          <Box>
            <Button onClick={saveSettings} colorScheme="teal">Save</Button>
          </Box>
        </Box>
      </Layout>
    );
  }
};

export default withUrqlClient(createUrqlClient)(Settings);
