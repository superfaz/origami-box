const axios = require('axios').default;
const { MongoClient } = require("mongodb");

class SystemError extends Error {
}

class UserError extends Error {
}

function assertSystem(value, message) {
  if (value === undefined || value === null) {
    throw new SystemError(message);
  }

  return value;
}

function assertUser(value, message) {
  if (value === undefined || value === null) {
    throw new UserError(message);
  }

  return value;
}

module.exports = async function (context, req) {
  try {
    context.log.info('/api/template call');

    const mongoUri = assertSystem(process.env.MONGO_CONNECTION_STRING, "MONGO_CONNECTION_STRING not defined");
    const facebookAppId = assertSystem(process.env.FACEBOOK_APP_ID, "FACEBOOK_APP_ID not defined");
    const facebookAppSecret = assertSystem(process.env.FACEBOOK_APP_SECRET, "FACEBOOK_APP_SECRET not defined");
    const accessToken = assertUser(req.headers.accesstoken, "Missing 'accesstoken' in the request headers");
    const userId = assertUser(req.headers.userid, "Missing 'userid' in the request headers");

    const response = await axios.get('https://graph.facebook.com/debug_token', {
      params: {
        input_token: accessToken,
        access_token: `${facebookAppId}|${facebookAppSecret}`,
      }
    });

    // Confirm that the response is valid
    if (response.status !== 200
      && response.data.data.app_id !== facebookAppId) {
      throw new SystemError("Can't connect to facebook APIs");
    }

    // Confirm that the user is valid
    if (response.data.data.is_valid !== true
      && response.data.data.app_id !== facebookAppId
      && response.data.data.user_id !== userId) {
      throw new UserError("Invalid user");
    }

    const client = new MongoClient(mongoUri, {
      useUnifiedTopology: true
    });

    try {
      await client.connect();

      const database = client.db('application');
      const templates = database.collection('templates');

      const query = { userId: userId };
      const results = templates.find(query);

      context.log('success');
      context.res = {
        body: await results.toArray(),
      };
    }
    finally {
      await client.close();
    }
  }
  catch (error) {
    if (error instanceof UserError) {
      context.log.warn('User request invalid', error);
      context.res = {
        status: 400,
        body: { error: error.message }
      }
    }
    else if (error instanceof SystemError) {
      context.log.error('Configuration issue', error);
      context.res = {
        status: 500,
        body: { error: 'Misconfiguration of the API' }
      }
    }
    else {
      context.log.error('Unplanned error', error);
      context.res = {
        status: 500,
        body: { error: 'System error in the API' }
      }
    }
  }
  finally {
    context.done();
  }
}