const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;

// 1. Load the model FIRST so it's available globally
const Task = require('./api/models/todoListModel');

// 2. Configure mongoose connection
mongoose.connect('mongodb://localhost/Tododb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// 3. Configure Express to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4. Import and register the routes
const routes = require('./api/routes/todoListRoutes');
routes(app); 

// Fallback for 404 errors
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// 5. Start the server
app.listen(port);
console.log('todo list RESTful API server started on: ' + port);