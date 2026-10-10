const mongoose = require("mongoose");

const connectDatabase = (url) => {
  const connectWithRetry = () => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
      })
      .catch((err) => {
        console.log(`MongoDB connection unsuccessful, retry after 5 seconds. Error: ${err.message}`);
        setTimeout(connectWithRetry, 5000);
      });
  };
  connectWithRetry();
};
module.exports = connectDatabase;
