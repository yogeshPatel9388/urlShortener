const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const validUrl = require("valid-url"); // Added for validation
const Url = require("../models/Url");

// @route   POST /api/url/shorten
// @desc    Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  // 1. Check if Base URL is valid (Server-side check)
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Internal Error: Invalid base URL");
  }

  // 2. Check if the User's Long URL is valid
  if (!validUrl.isUri(longUrl)) {
    return res
      .status(401)
      .json(
        "Invalid Long URL. Please enter a valid link (including http/https)"
      );
  }

  try {
    // 3. Check if URL already exists in DB to avoid duplicates
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.json(url);
    } else {
      // 4. Create unique URL code and full short URL
      const urlCode = shortid.generate();
      const shortUrl = `${baseUrl}/${urlCode}`;

      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date(),
      });

      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

// @route   GET /:code
// @desc    Redirect to long/original URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      // Perform a 301 Permanent Redirect
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL found with that code");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
