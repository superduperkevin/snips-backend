const express = require('express');
const Snippet = require('../models/Snippet.model');
const snippets = require('../controllers/snippets.controller');

const router = express.Router();

router.get('/', (request, response) => {
  console.log(`We're in the router!`);
  response.send('Welcome to Snips!');
});

router.get('/api', (request, response) => {
  response.send('Welcome to Snips API!');
});

// router.get('/api/snippets/:id', async (request, response) =>
//   // 1. get data from Snippets model
//   // const snippets = await Snippet.select();
//   // 2. send that out
//    response.send(snippets)
// );

router.post('/api/snippets', snippets.createSnippet);
router.get('/api/snippets', snippets.getAllSnippets);
router.get('/api/snippets/:id', snippets.getSnippetById);
router.patch('/api/snippets/:id', snippets.updateSnipById);
router.delete('/api/snippets/:id', snippets.deleteSnipById);

module.exports = router;
