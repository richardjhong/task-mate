const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

mongoose.connect('mongodb://127.0.0.1:27017/task_mate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
