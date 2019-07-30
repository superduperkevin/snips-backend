const fs = require('fs').promises;
const path = require('path');
/**
 * Gets absolute path to 'resource' db file
 * @param {string} resource
 */

const dbpath = resource => path.join(__dirname, '..', 'db', `${resource}.json`);

exports.readJsonFromDb = async resource => JSON.parse(await fs.readFile(dbpath(resource)));

exports.writeJsonToDb = async (resource, data) => {
  await fs.writeFile(dbpath(resource), JSON.stringify(data));
};
