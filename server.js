const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDb = require('./config/db.js');
const router = require('./routes/routes.js');

const app = express();

port = 5000;
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDb();

app.use('/tasks', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
