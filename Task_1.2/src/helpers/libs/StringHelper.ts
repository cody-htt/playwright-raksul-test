/**
 * Replaces occurrences of '{Item}' in a string with the provided substrings.
 * @param str - The original string.
 * @param newSubstr - The substrings to replace '{Item}' with.
 * @returns The modified string with '{Item}' replaced by the substrings.
 */
export const replaceStringItem = (str: string, ...newSubstr: string[]): string => {
  let i = 0;
  return str.replace(new RegExp('{Item}', 'g'), () => newSubstr[i++ % newSubstr.length]);
};
