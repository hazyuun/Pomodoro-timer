/**
 * Converts a number of seconds to a string in the HH:MM:SS format
 * 
 * @param seconds The number of seconds
 * @returns A string in the HH:MM:SS format
 */
export const formatSeconds = (seconds: number) => {
  return new Date(seconds * 1000).toISOString().slice(11, 19)
}
