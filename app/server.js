
const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('bluebird');

import Bot from './bot';

function makeServer() {

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(morgan('tiny'));

  app.use('/chat', Bot.router());

  app.set('port', process.env.PORT|| 5000);

  var server = app.listen(app.get('port'), function (err) {
    if (err) {
      console.log('error while starting server', err);
    }

    const host = `http://localhost:${app.get('port')}`;
    console.log(`Server is running: ${host}`);
    if (process.env.USE_LOCAL_CHAT) {
      console.log(`Local chat is running here: ${host}/chat/localChat/`);
    }
  });
  return server;
}

module.exports = makeServer;
