const axios = require("axios").default;
const { MongoClient } = require("mongodb");
const {
  errorMiddleware,
  assertSystem,
  assertUser,
} = require("../_shared/errors");
const { facebookApiCheckUserId } = require("../_shared/facebook");

async function templateFunction(context, req) {
  context.log.info("/api/template call");

  const mongoUri = assertSystem(
    process.env.MONGO_CONNECTION_STRING,
    "MONGO_CONNECTION_STRING not defined"
  );
  const accessToken = assertUser(
    req.headers.accesstoken,
    "Missing 'accesstoken' in the request headers"
  );
  const userId = assertUser(
    req.headers.userid,
    "Missing 'userid' in the request headers"
  );

  await facebookApiCheckUserId(accessToken, userId);

  const client = new MongoClient(mongoUri, {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const database = client.db("origami-box");
    const templates = database.collection("templates");

    const query = { userId: userId };
    const results = templates.find(query);

    context.res = {
      body: await results.toArray(),
    };
  } finally {
    await client.close();
  }
}

module.exports = async function (context, req) {
  await errorMiddleware(context, req, templateFunction);
  context.done();
};
