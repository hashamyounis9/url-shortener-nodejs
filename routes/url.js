const express = require("express");
const { handleCreateShortUrl, handleRedirectURL, handleVisitedHistory } = require("../controllers/url");

const urlRoute = express.Router();

urlRoute.post("/", handleCreateShortUrl);
urlRoute.get("/:shortId", handleRedirectURL);
urlRoute.get("/history/:shortId", handleVisitedHistory)

module.exports = urlRoute;
