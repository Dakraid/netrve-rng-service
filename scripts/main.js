import { Settings } from "./settings.js";

// Generates random number using a cryptographic method
function getCryptoRandom() {
    let buffer = new ArrayBuffer(8);
    let ints = new Int8Array(buffer);
    window.crypto.getRandomValues(ints);
    ints[7] = 63;
    ints[6] |= 0xf0;
    return new DataView(buffer).getFloat64(0, true) - 1;
}

// Generates random number with fudge factor based on the current settings
async function getRandom() {
    const response = await fetch(Settings.getUri());
    const result = parseFloat(await response.text());

    console.log(result);

    if (response.status !== 200) {
        return 1;
    }

    return result;
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
    if (!game.user.isGM) {
        Object.freeze(CONFIG.Dice);
    }
});
