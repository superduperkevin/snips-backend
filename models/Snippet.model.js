/* WHAT UP!! */
const shortid = require('shortid');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils.js');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

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

exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language)
      throw ErrorWithHttpStatus('Missing properties', 400);
    // read snippets.json
    const snippets = await readJsonFromDb('snippets');

    // grab data from new snippet
    // make newSnippet a proper object
    // push the object into snippets
    // write to the file

    snippets.push({
      id: shortid.generate,
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorites: 0,
    });
    await writeJsonToDb('snippets', snippets);
    return snippets[snippets.length - 1];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/*
 * Selects snippets from db.
 * Can accept optional query object to filter results.
 */
exports.select = async (query = {}) => {
  try {
    // 1. Read the file   // 2. Parse it
    const snippets = await readJsonFromDb('snippets');
    // filter with query
    // check if every query[key] = snippet[key]
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => query[key] === snippet[key])
    );
    // 3. Return the data
    return filtered;
  } catch (err) {
    throw new ErrorWithHttpStatus('Database error', 500);
  }
};

/** Update
 * @param {string} id
 * @param {Snippet} newData
 */

exports.update = async (id, newData) => {
  // 1. read the file
  const snippets = await readJsonFromDb('snippets');
  // 2. find the matching id
  const filteredSnips = snippets.map(snippet => {
    //
    if (snippet.id !== id) return snippet;

    Object.keys(newData).forEach(key => {
      if (key in snippet) snippet[key] = newData[key];
      snippet[key] = newData[key];
    });
    return snippet;
  });

  // 3. update the snipper with appropriate data (make sure to validate)
  // 4. write back to db
};

/**
 * @param {string} id
 */

exports.delete = async id => {
  // 1. Read in the db file
  const snippets = await readJsonFromDb('snippets');
  // 2. filter snippets for everything id === id
  const filteredSnips = snippets.filter(snippet => snippet.id !== id);
  if (filteredSnips.length === snippets.length) return;
  // 3. write the file
  await writeJsonToDb('snippets', filteredSnips);
  return readJsonFromDb('snippets');
};
