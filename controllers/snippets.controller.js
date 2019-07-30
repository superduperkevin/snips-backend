const Snippet = require('../models/Snippet.model');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

exports.createSnippet = async (request, response) => {
  // 1. get data from Snippets model
  const snippet = await Snippet.select();
  // 2. send that out
  return response.send(snippet);
};
exports.getSnippets = async (request, response) => {
  const snippets = await Snippet.select();
  return response.send(snippets);
};

exports.getSnippetsById = async (request, response) => {
  try {
    const { id } = request.params;
    // get the snippet: call Snippet.select passing an id (from request.params)
    const snippet = await Snippet.select({ id });

    if (snippet.length === 0) {
      throw new ErrorWithHttpStatus('Invalid ID', 404);
    }
    // send that snippet back
    // response.send(snippets[id]);
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) response.status(404).send(err.message);
  }
};
