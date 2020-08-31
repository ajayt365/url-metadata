const axios = require("axios").default;
const cheerio = require("cheerio");

exports.crawl = async (url) => {
  try {
    let metaData = {};
    let ogMetaData = {};
    let ogParamsLength = 0;

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const metaTags = $("meta");

    metaTags.each((i, e) => {
      if (e.attribs.property && e.attribs.property.includes("og")) {
        ogMetaData[e.attribs.property] = e.attribs.content;
        ogParamsLength++;
      } else if (e.attribs.name) {
        metaData[e.attribs.name] = e.attribs.content;
      }
    });

    // if there is ogMetaData return og
    let response = ogParamsLength ? ogMetaData : metaData;

    return response;
  } catch (error) {
    throw error;
  }
};
