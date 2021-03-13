const axios = require("axios").default;
const { validate: uuidValidate } = require("uuid");
const { MongoClient } = require("mongodb");
const {
  errorMiddleware,
  assertSystem,
  assertUser,
  UserError,
} = require("../_shared/errors");
const { facebookApiCheckUserId } = require("../_shared/facebook");

async function templateFunction(context, req, key) {
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

  if (key !== undefined && !uuidValidate(key)) {
    throw new UserError("The key parameter should be a uuid");
  }

  const limit = Number.parseInt(req.params.limit) || 0;

  await facebookApiCheckUserId(accessToken, userId);

  const client = new MongoClient(mongoUri, {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const database = client.db("origami-box");
    const templates = database.collection("templates");

    if (key === undefined) {
      const query = { userId: userId };
      const sort = { savedate: -1 };
      const results = templates.find(query).sort(sort).limit(limit);

      context.res = {
        body: await results.toArray(),
      };
    } else {
      const query = { userId: userId, key: key };
      const result = await templates.findOne(query);

      context.res = {
        body: result,
      };
    }
  } finally {
    await client.close();
  }
}

module.exports = async function (context, req) {
  await errorMiddleware(context, req, templateFunction);
  context.done();
};
