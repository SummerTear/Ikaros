const polka = require("polka");
const { json } = require("body-parser");
const hasha = require("hasha");

class Ikaros {
  constructor(opts = {}) {
    this.db = opts.db;
    this.store = opts.store;

    this.server = polka(opts);

    // Hello, ikaros
    this.server.get("/", (req, res) => {
      res.end("Hello, ikaros!");
    });

    // get image
    this.server.get("/:app/:id", (req, res) => {
      const { id } = req.params;
      const { db, store } = this;

      const key = db.get(id, store.name);
      const image = store.get(key);

      res.end(`ImageId: ${id}`);
    });

    // upload image
    this.server.use(json()).post("/upload", (req, res) => {
      let key = "";
      if (req.body) {
        key = req.body.key;
      }
      res.end(key);
    });
  }

  listen() {
    this.server.listen.apply(this.server, arguments);
  }
}

module.exports = opts => new Ikaros(opts);
