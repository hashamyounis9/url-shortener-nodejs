const shortid = require("shortid");
const URL = require("../models/url");

async function handleCreateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) res.status(400).json({ error: "URL is required" });

  const shortId = shortid(8);

  await URL.create({
    shortid: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  res.status(201).json({ shortId: shortId });
}

async function handleRedirectURL(req, res) {
  const id = req.params.shortId;
  if (!id) res.status(400).json({ error: "short id required" });
  const entry = await URL.findOneAndUpdate(
    {
      shortid: id,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.status(200).redirect(entry.redirectURL);
}

async function handleVisitedHistory(req, res) {
  const id = req.params.shortId;
  if (!id) res.json({ error: "id required" });
  const entries = await URL.find({ shortid: id });
  res.json(entries);
}

module.exports = {
  handleCreateShortUrl,
  handleRedirectURL,
  handleVisitedHistory,
};
