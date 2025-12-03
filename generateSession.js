/**
 * @description Module ini berisi sesi yang dibutuhkan untuk mempermudah penulisan di astro.config.mjs
 */

/**
 * Generate banyaknya sesi
 * @param {number} countOfSession
 * @returns {Array<number>}
 */
function generateSession(countOfSession) {
  return [...Array(countOfSession)].map((value, index) => value ?? index + 1);
}

export { generateSession };
