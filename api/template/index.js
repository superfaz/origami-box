const axios = require("axios").default;
const { validate: uuidValidate } = require("uuid");
const { MongoClient } = require("mongodb");
const {
  errorMiddleware,
  assertSystem,
  assertUser,
  UserError,
  SystemError,
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

  const key = context.bindingData.key;
  if (key !== undefined && !uuidValidate(key)) {
    throw new UserError("The key parameter should be a uuid");
  }

  await facebookApiCheckUserId(accessToken, userId);

  const client = new MongoClient(mongoUri, {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const database = client.db("origami-box");
    const templates = database.collection("templates");

    async function executeGet() {
      const limit = Number.parseInt(req.params.limit) || 0;

      if (key === undefined) {
        // Retrieve all
        const query = { userId: userId };
        const sort = { savedate: -1 };
        const results = templates.find(query).sort(sort).limit(limit);

        context.res = {
          body: await results.toArray(),
        };
      } else {
        // Retrieve one
        const query = { userId: userId, key: key };
        const result = await templates.findOne(query);

        context.res = {
          body: result,
        };
      }
    }

    async function executeDelete() {
      if (key === undefined) {
        throw new UserError("missing template key");
      }

      const result = await templates.deleteOne({ userId: userId, key: key });

      context.res = {
        body: { deleteCount: result.deletedCount },
      };
    }

    async function executePost() {
      if (key !== undefined) {
        throw new UserError(
          "template key can't be defined for a POST (create), use PUT method instead."
        );
      } else {
        const body = req.body;
        // TODO: validate the body.
        const result = await templates.insertOne({ body });

        context.res = {
          body: { insertedId: result.insertedId },
        };
      }
    }

    switch (req.method) {
      case "GET":
        await executeGet();
        break;
      case "DELETE":
        await executeDelete();
        break;
      case "POST":
        await executePost();
        break;
      default:
        throw new SystemError(`method ${req.method} is not supported`);
    }
  } finally {
    await client.close();
  }
}

module.exports = async function (context, req) {
  await errorMiddleware(context, req, templateFunction);
  context.done();
};
