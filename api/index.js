const app = require("./src/app.js");
const { conn } = require("./src/db.js");

const port = 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
