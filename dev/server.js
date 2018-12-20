const ikaros = require("../packages/ikaros/src/index.js");

const app = ikaros();

app.listen(3000, err => {
  if (err) throw err;
  console.log("> Running on localhost:3000");
});
