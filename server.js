const mongoose = require("mongoose");
const app = require("./index.js");

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running on port: 5000");
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
