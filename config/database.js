//database.js
const mongoose = require('mongoose');

class Connection {
  constructor() {
    const username = encodeURIComponent(process.env.MONGODB_USERNAME );
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
    const cluster = process.env.MONGODB_CLUSTER;
    const database = process.env.MONGODB_DATABASE

    let uri =`mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;

    console.log("Establish new connection with url", uri);
      
      mongoose.connect(uri)
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
}
}

module.exports = new Connection();