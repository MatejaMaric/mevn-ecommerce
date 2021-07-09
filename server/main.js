const express = require('express');
const app = express();
const mongoose = require('mongoose');

const {port, mongoUrl} = require("./config/env");
const apiRoutes = require('./routes/api');

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log("Successfully connected to MongoDB!"));

app.use(express.json());

app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Server started on port ${port}.`));
