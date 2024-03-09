const express = require("express");
const { GenerateNewShortUrl, GetAnalytics }  = require("../Controller/control");
const router = express.Router();

router.post("/", GenerateNewShortUrl);
router.get("/analytics/:shortId",GetAnalytics);
module.exports = router;