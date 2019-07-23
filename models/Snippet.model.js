/* WHAT UP!! */
const fs = require('fs').promises;
const path = require('path');

/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */
/**
 * @param {Object} [query]
 * @returns {Promise<Object[]>}
 */
/*
 * Selects snippets from db.
 * Can accept optional query object to filter results.
 */
exports.select = async (query = {}) => {
  try {
    // 1. Read the file   // 2. Parse it
    const dbpath = path.join(__dirname, '..', 'db', 'snippets.json');
    const snippets = JSON.parse(await fs.readFile(dbpath));
    // filter with query
    // check if every query[key] = snippet[key]
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => query[key] === snippet[key])
    );
    // 3. Return the data
    return filtered;
  } catch (err) {
    console.log('ERROR in Snippet model');
    throw err;
  }
};
/* Update */
/* Delete */
