const app = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
axios.defaults.baseURL = process.env.EXPRESS_API || 'http://localhost:3001';

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Blue Bird API listening on port ${process.env.PORT}`);
    axios(`http://localhost:${process.env.PORT}/pushdbdata`)
      .then(() => {
        console.log("JSON Data Loaded to Database.");
      })
      .catch((e) => "Error loading");
  });
});
