const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

// HTTP header protection
app.use(helmet());

// Enabling use of CORS - this may not be necessary
app.use(cors());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Redirect our request to `https://` if it is not already
app.all((req, res, next) => {
  if (req.protocol !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

module.exports = app;
