require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");

const { requestApi } = require("./values.js");

const main = async () => {
  try {
    const info = await requestApi();
    tweet(info);
    console.log("Wartość temp:", info.newResolut, info.ifRain);
  } catch (error) {
    console.log("Wystąpił błąd:", error);
  }
};

const tweet = async (temp) => {
  try {
    await twitterClient.v2.tweet(
      `today in Glwiwice we have ${temp.newResolut} bike condition, ${info.ifRain}`
    );
  } catch (e) {
    console.log(e);
  }
};

main();
