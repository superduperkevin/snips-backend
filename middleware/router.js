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

router.get('/api/snippets', snippets.getSnippets);

router.get('/api/snippets/:id', snippets.getSnippetsById);

router.patch('/api/snippets/:id', (request, response) => {
  response.send('Patch one');
});

router.post('/api/snippets', snippets.createSnippet);

router.delete('/api/snippets/:id', (request, response) => {
  response.send('Delete one');
});

module.exports = router;
