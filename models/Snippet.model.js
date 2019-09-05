/* WHAT UP!! */
const format = require('pg-format');
const shortid = require('shortid');
const db = require('../db/index.js');
// const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils.js');
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
  if (!author || !code || !title || !description || !language)
    throw new ErrorWithHttpStatus('Missing properties', 400);
  return (await db.query(
    `INSERT INTO snippet (code, title, description, author, language) VALUES ($1, $2, $3, $4, $5)`,
    [code, title, description, author, language]
  )).rows[0];
};

/*
 * Selects snippets from db.
 * Can accept optional query object to filter results.
 */
exports.select = async query => {
  try {
    const clauses = Object.keys(query)
      .map((key, i) => `%I = $${i + 1}`)
      .join(' AND ');
    const formattedSelect = format(
      `SELECT * FROM snippet ${clauses.length ? `WHERE ${clauses}` : ''}`,
      ...Object.keys(query)
    );
    const selectQuery = await db.query(formattedSelect, Object.values(query));
    return selectQuery.rows;
    // const whereClause = `WHERE ${Object.keys(query).map((_, i) => `%I = $${i + 1}`)}`;
    // const sql = format(`SELECT * FROM snippet ${query ? whereClause : ''} ORDER BY id`);
    //   // 1. Read the file   // 2. Parse it
    //   const snippets = await readJsonFromDb('snippets');
    //   // filter with query
    //   // check if every query[key] = snippet[key]
    //   const filtered = snippets.filter(snippet =>
    //     Object.keys(query).every(key => query[key] === snippet[key])
    //   );
    //   // 3. Return the data
    //   return filtered;
    // } catch (err) {
    //   throw new ErrorWithHttpStatus('Database error', 500);
  } catch (err) {
    throw new ErrorWithHttpStatus('Database error');
  }
};

/** Update
 * @param {string} id
 * @param {Snippet} newData
 */

exports.update = async (id, newData) => {
  try {
    const { author, code, title, description } = newData;
    await db.query(
      `UPDATE snippet
    SET 
      author = COALESCE($2, author),
      code = COALESCE($3, code),
      title = COALESCE($4, title),
      description = COALESCE($5, description)
    WHERE id = ($1)`,
      [id, author, code, title, description]
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};
/**
 * @param {string} id
 */

exports.delete = async ({ id }) => {
  try {
    const result = await db.query(`DELETE FROM snippet WHERE id = $1`, [id]);
    if (result.rowCount === 0)
      throw new ErrorWithHttpStatus(`Snippet with ID ${id} not found`, 404); // short circuit if id not found
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
  }
};
