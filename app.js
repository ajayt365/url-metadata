const express = require("express");
const { crawl } = require("./crawler");

const app = express();

app.use(express.json());

app.post("/fetch", async (req, res) => {
  try {
    const { url } = req.body;
    const response = await crawl(url);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
