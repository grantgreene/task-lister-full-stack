const mongoose = require('mongoose');

async function connectDb() {
  try {
    const con = await mongoose.connect(process.env.MONGO_CONNECT_URI);
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (err) {
    console.log('dberror');
  }
}

module.exports = connectDb;
