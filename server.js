const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.disable('x-powered-by');
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/formula-one-racing'), {
    etag: false
  })
);

// Returns all drivers
app.get('/api/drivers', (req, res) => {
  request('http://localhost:3000/drivers', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Returns all teams
app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  })
});

// Adds driver
app.post('/api/drivers', (req, res) => {
  request({url: 'http://localhost:3000/drivers', method: 'POST', json: req.body}, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Returns driver by id
app.get('/api/drivers/:id', (req, res) => {
  const id = req.params.id;
  request('http://localhost:3000/drivers/' + id, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  })
});

// Updates driver
app.put('/api/drivers/:id', (req, res) => {
  const id = req.params.id;
  request({url: 'http://localhost:3000/drivers/' + id, method: 'PUT', json: req.body}, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Deletes driver
app.delete('/api/drivers/:id', (req, res) => {
  const id = req.params.id;
  request({url: 'http://localhost:3000/drivers/' + id, method: 'DELETE', json: req.body}, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/formula-one-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
