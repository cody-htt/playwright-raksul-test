/**
 * Returns a random element from the given array.
 * @param arr - The array to get a random element from.
 * @returns The randomly selected element from the array.
 */
export const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/**
 * Generates a random string of the specified length.
 * @param length - The length of the random string to generate (default is 5 chars).
 * @returns The generated random string.
 */
export const generateRandomString = (length = 5): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
