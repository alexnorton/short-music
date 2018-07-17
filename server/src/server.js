const express = require("express");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();

const BASE_DIR = process.env.BASE_DIR;
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello");
});

const withoutThe = input => input.match(/^(?:The )?(.+)$/)[1];

app.get("/browse", function(req, res) {
  const dir = path.join(BASE_DIR, req.query.path || "");

  fs.stat(dir, (err, stats) => {
    if (!err && stats.isDirectory()) {
      fs.readdir(dir, function(err, files) {
        res.json(
          files.sort((a, b) => withoutThe(a).localeCompare(withoutThe(b)))
        );
      });
    } else {
      res.json([]);
    }
  });
});

app.get("/get", function(req, res) {
  var filePath = path.join(BASE_DIR, req.query.path, req.query.file);

  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
