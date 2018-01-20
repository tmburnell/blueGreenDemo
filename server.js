// Get dependencies
const express = require('express'),
  path = require('path'),
  http = require('http'),
  bodyParser = require('body-parser'),
  router = express.Router(),
  app = express()

router.get('/api/v1/features', (req, res) => {
  debugger;
  res.send(JSON.stringify({
    "v1": true,
    "v2": process.env.v2 ? true : false
  }));
});
router.get('/api/v1/color', (req, res) => {
  res.send(JSON.stringify({"color": "blue"}));
});
router.get('/api/v2/color', (req, res) => {
  res.send(JSON.stringify({"color": "green"}));
});

// Parsers for POST data
app.use(bodyParser.json());                             // JSON Body Support
app.use(bodyParser.urlencoded({extended: true}));    // Query String Support

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(router);

console.log("processing static code");
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4300';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
