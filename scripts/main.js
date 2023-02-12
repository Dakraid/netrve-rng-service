import { Settings } from "./settings.js";

// Generates random number with fudge factor based on the current settings
function getRandom() {
  let call = fetch(Settings.getUri)
    .then((response) => response.json())
    .catch((error) => console.error("Unable to call endpoint.", error));

  console.log(call);
  return 1;
}

Hooks.once("init", () => {
  Settings.registerSettings();
});

Hooks.once("ready", () => {
  // Set randomUniform to call our getRandom
  if (Settings.getUseCrypto) {
    CONFIG.Dice.randomUniform = getRandom;
  }

  // Freeze the Dice class for players to avoid modification (harder to cheat)
  if (!game.user.isGM) {
    Object.freeze(CONFIG.Dice);
  }
});
