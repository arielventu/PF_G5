const app = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");

const port = 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    axios("http://localhost:3001/pushdbdata")
      .then(() => {
        console.log("JSON Data Loaded to Database.");
      })
      .catch((e) => "Error loading");
  });
});
