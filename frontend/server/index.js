'use strict';

/**
 * Load Twilio configuration from .env config file - the following environment
 * variables should be set:
 * process.env.TWILIO_ACCOUNT_SID
 * process.env.TWILIO_API_KEY
 * process.env.TWILIO_API_SECRET
 */
require('dotenv').load();

const express = require('express');
const http = require('http');
const path = require('path');

const { jwt: { AccessToken } } = require('twilio');

const VideoGrant = AccessToken.VideoGrant;

// Max. period that a Participant is allowed to be in a Room (currently 14400 seconds or 4 hours)
const MAX_ALLOWED_SESSION_DURATION = 14400;

// Create Express webapp.
const app = express();

/**
 * Default to the Quick Start application.
 */
 app.get('/', (request, response) => {
  response.redirect('/quickstart');
});

// Set up the path for the quickstart.
const quickstartPath = path.join(__dirname, '../quickstart/public');
app.use('/quickstart', express.static(quickstartPath));

// Create http server and run it.
const server = http.createServer(app);
const port = 3000;
server.listen(port, function() {
  console.log('Express server running on *:' + port);
});
