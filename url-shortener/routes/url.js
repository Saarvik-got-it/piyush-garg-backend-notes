const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleRedirect,
  handleGetAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/url", handleGenerateNewShortUrl);
router.get("/:shortId", handleRedirect);
router.get("/url/analytics/:shortId", handleGetAnalytics);

module.exports = router;
