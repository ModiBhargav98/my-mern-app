const app = require("./app");
const config = require("./config/config");
const connectDatabase = require("./config/database");
connectDatabase(config.DB_URl);

const server = app.listen(config.PORT || 4001, () => {
  console.log(`Server is Working On ${config.PORT || 4001}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Error: Port ${config.PORT || 4001} is already in use. Please check if another process or Docker container is using this port.`);
  } else {
    console.error(`Server error: ${err.message}`);
  }
  process.exit(1);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
