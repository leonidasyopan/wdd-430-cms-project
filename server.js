// Get dependencies
const express = require('express');

const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// import the routing file to handle the default (index) route
const index = require('./server/routes/app');
// const messagesRoutes = require('./server/routes/messages');
// const contactsRoutes = require('./server/routes/contacts');
// const documentsRoutes = require('./server/routes/docunents');

const app = express(); // create an instance of express

// app.use('/', index);

// Tell express to map all other non—defined routes back to the index page
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   res.render("index");
// });


// Tell express to use the following parsers for POST data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/cms')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
app.use('/messages', messagesRoutes);
app.use('/contacts', contactsRoutes);
app.use('/documents', documentsRoutes);

// // Tell express to map all other non-defined routes back to the index page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
