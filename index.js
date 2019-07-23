const Snippet = require('./models/Snippet.model');

async function testModels() {
  const snippets = await Snippet.select({
    id: '1',
  });
}

testModels();
