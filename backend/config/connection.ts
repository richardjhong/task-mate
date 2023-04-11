const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/task_mate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const db = mongoose.connection;
