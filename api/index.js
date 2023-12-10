const renderBadgesCard = require("../src/cards/badges-card");
const renderError = require("../src/cards/error-card");
const fetchBadges = require("../src/fetch/badges-fetcher");

export default async function handler(req, res) {
    const { 
      username,
      sort,
      theme,
      maxResults
    } = req.query;

    try {
      // console.log(`index.js: BEGIN`)

      // HTTP GET 
      const badges = await fetchBadges(
        username,
        sort
      );

      // Send Response
      // console.log(`index.js: SUCCESS`)
      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader("Vary", "Accept-Encoding");
      return res.send(renderBadgesCard(badges, theme, maxResults));
      
    } catch (err) {
      // console.log(`index.js: ERROR: ${err.message}`)
      // Send Error Response
      return res.send(renderError(err.message, err.secondaryMessage));
    }
  };