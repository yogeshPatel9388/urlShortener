const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const Url = require("../models/Url");

// Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  try {
    let url = await Url.findOne({ longUrl });
    if (url) return res.json(url);

    const urlCode = shortid.generate();
    const shortUrl = `${baseUrl}/${urlCode}`;

    url = new Url({ longUrl, shortUrl, urlCode });
    await url.save();
    res.json(url);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

// Redirect logic
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) return res.redirect(url.longUrl);
    return res.status(404).json("No URL found");
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

module.exports = router;
