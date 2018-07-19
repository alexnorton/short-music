const express = require("express");
const fs = require("fs-extra");
const path = require("path");

require("dotenv").config();

const app = express();

const BASE_DIR = process.env.BASE_DIR;
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/browse", async (req, res) => {
  const dir = path.join(BASE_DIR, req.query.path || "");

  try {
    const dirStats = await fs.stat(dir);

    if (dirStats.isDirectory()) {
      const items = await fs.readdir(dir);

      const directories = items.filter(item =>
        fs.statSync(path.join(dir, item)).isDirectory()
      );

      const files = items.filter(item =>
        fs.statSync(path.join(dir, item)).isFile()
      );

      res.json({ directories, files });
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/get", function(req, res) {
  var filePath = path.join(BASE_DIR, req.query.path, req.query.file);

  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
