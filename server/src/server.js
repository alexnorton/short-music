const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const BASE_DIR = "/Volumes/Irwell/Music/iTunes/iTunes Music/Music";

const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Hello");
});

const withoutThe = input => input.match(/^(?:The )?(.+)$/)[1];

app.get("/browse", function(req, res) {
  const dir = path.join(BASE_DIR, req.query.path);

  fs.readdir(dir, function(err, files) {
    res.json(files.sort((a, b) => withoutThe(a).localeCompare(withoutThe(b))));
  });
});

app.get("/get", function(req, res) {
  var path = BASE_DIR + (req.query.path || "") + req.query.file;

  res.sendFile(path);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
