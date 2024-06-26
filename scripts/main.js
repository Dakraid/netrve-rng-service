import {Settings} from "./settings.js";

// Generates random number using a cryptographic method
function getCryptoRandom() {
  let buffer = new ArrayBuffer(8);
  let ints = new Int8Array(buffer);
  window.crypto.getRandomValues(ints);
  ints[7] = 63;
  ints[6] |= 0xf0;
  return new DataView(buffer).getFloat64(0, true) - 1;
}

// Make call against our web API and return the float 0f to 1f
function getRandom() {
  const request = new XMLHttpRequest();
  const user = game.user.name
  const uri = Settings.getUri().endsWith("/") ? Settings.getUri() + user : Settings.getUri() + "/" + user;
  request.open("GET", uri, false);
  request.setRequestHeader("Authorization", Settings.getKey())
  request.send(null);

  if (request.status !== 200) {
    return getCryptoRandom();
  }

  const json = JSON.parse(request.responseText)

  return parseFloat(json.rng);
}

Hooks.once("init", () => {
  Settings.registerSettings();
});

Hooks.once("ready", () => {
  // Set randomUniform to call our getRandom
  if (Settings.getUseCrypto()) {
    CONFIG.Dice.randomUniform = getRandom;
  }

  // Freeze the Dice class for players to avoid modification (harder to cheat)
  Object.freeze(CONFIG.Dice);
});
