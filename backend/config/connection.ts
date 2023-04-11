const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/task_mate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
