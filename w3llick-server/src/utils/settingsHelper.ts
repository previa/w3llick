import { Setting } from "src/entities/Setting";
import { readFileSync, writeFileSync } from "fs";

export const default_settings = {
  tmdb_key: "",
};

export async function getSettings(): Promise<Setting> {
  let raw = {} as Buffer;
  try {
    raw = await readFileSync("settings.json");
  } catch (err) {
    if (err.code == "ENOENT") {
      console.log("File could not be opened");
      console.log("Making a settings file");
      let data = JSON.stringify(default_settings);
      try {
        await writeFileSync("settings.json", data);
      } catch (e) {
        console.log("Somthing went wrong creating settings.json");
      }
    } else {
      console.log("Somthing went wrong reading settings.json");
    }
  }
  const setting = JSON.parse(raw.toString()) as Setting;

  return setting;
}

export async function setSettings(settings: Setting): Promise<Setting> {
  const data = JSON.stringify(settings);
  await writeFileSync('settings.json', data);
  const raw = await readFileSync("settings.json");

  return JSON.parse(raw.toString()) as Setting;
}