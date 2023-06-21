require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");

const { requestApi } = require("./values.js");

const main = async () => {
  try {
    const info = await requestApi();

    console.log("Wartość temp:", info.newResolut, info.ifRain);
  } catch (error) {
    console.log("Wystąpił błąd:", error);
  }
};

main();

const tweet = async (temp) => {
  try {
    await twitterClient.v2.tweet();
  } catch (e) {
    console.log(e);
  }
};
