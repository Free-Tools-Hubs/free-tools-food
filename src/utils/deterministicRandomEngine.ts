/**
 * Simple hash function for strings
 */
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/**
 * Seedable random number generator (Linear Congruential Generator)
 */
const createRandom = (seed: number) => {
  let currentSeed = seed;
  return () => {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
  };
};

/**
 * Deterministic random engine to get consistent randomness based on a key (like slug)
 */
export const getDeterministicRandom = (key: string) => {
  const seed = hashString(key);
  return createRandom(seed);
};

export const pickDeterministic = <T>(array: T[], seed: string): T => {
  // Better hash function (DJB2 inspired)
  let hash = 5381;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 33) ^ seed.charCodeAt(i);
  }
  return array[Math.abs(hash) % array.length];
};
