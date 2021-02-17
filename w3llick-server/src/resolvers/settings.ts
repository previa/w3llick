import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { Setting } from "../entities/Setting";
import { getSettings, setSettings } from "../utils/settingsHelper";

@Resolver()
export class SettingResolver {
  @Query(() => Setting, {nullable: true})
  async settings(): Promise<Setting> {
    const settings = await getSettings() as Setting;

    return settings;
  }

  @Mutation(() => Setting)
  async setSettings(
    @Arg("tmdb_key", () => String) tmdb_key: String,
  ): Promise<Setting> {
    const settings = {
        tmdb_key: tmdb_key
    } as Setting
    const _settings = await setSettings(settings) as Setting; 

    return _settings;
  }
}
