const express = require('express');
const router = require('./middleware/router');
const logger = require('./middleware/logger');

const app = express();

app.use(express.json()); // parses reqs with json payloads
app.use(logger);
app.use(router);

app.listen(process.env.PORT || 6969, () => {
  console.log('Snips server running on port 6969');
});
