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
const validate = require("../_shared/validate");

async function templateFunction(context, req) {
  context.log.info(
    `/api/template [method:${req.method}] [key:${context.bindingData.key}]`
  );

  // Tests all global parameters
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

    async function executeGetAll() {
      const limit = Number.parseInt(req.params.limit) || 0;
      const query = { userId: userId };
      const sort = { savedate: -1 };
      const results = templates.find(query).sort(sort).limit(limit);

      context.res = {
        body: await results.toArray(),
      };
    }

    async function executeGetOne(key) {
      const query = { userId: userId, key: key };
      const result = await templates.findOne(query);

      context.res = {
        body: result,
      };
    }

    async function executeDelete(key) {
      const result = await templates.deleteOne({ userId: userId, key: key });

      context.res = {
        body: { deleteCount: result.deletedCount },
      };
    }

    async function executePost() {
      const template = req.body;
      const validation = await validate(template);
      if (!validation.valid) {
        context.res = {
          status: 400,
          body: { error: validation.reason },
        };

        return;
      }

      const result = await templates.insertOne(template);
      context.res = {
        body: { insertedId: result.insertedId },
      };
    }

    if (key === undefined) {
      switch (req.method) {
        case "GET":
          await executeGetAll();
          break;
        case "POST":
          await executePost();
          break;
        default:
          context.res = {
            status: 404,
          };
      }
    } else {
      switch (req.method) {
        case "GET":
          await executeGetOne(key);
          break;
        case "DELETE":
          await executeDelete(key);
          break;
        default:
          context.res = {
            status: 404,
          };
      }
    }
  } finally {
    await client.close();
  }
}

module.exports = async function (context, req) {
  await errorMiddleware(context, req, templateFunction);
  context.done();
};
