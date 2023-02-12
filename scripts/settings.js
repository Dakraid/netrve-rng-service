const modName = "netrve-rng-service";
const settings = {
  usecrypto: {
    name: "nrs.settings.usecrypto.name",
    hint: "nrs.settings.usecrypto.hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  },
  uri: {
    name: "nrs.settings.uri.name",
    hint: "nrs.settings.uri.hint",
    scope: "world",
    config: true,
    type: String,
    default: "",
  },
};
export class Settings {
  static getUseCrypto() {
    return game.settings.get(modName, "usecrypto");
  }
  static getUri() {
    return game.settings.get(modName, "uri");
  }
  static registerSettings() {
    for (const [name, setting] of Object.entries(settings)) {
      game.settings.register(modName, name, setting);
    }
  }
}
