const axios = require('axios').default;
const { MongoClient } = require("mongodb");

function assert(value, message) {
  if (value === undefined || value === null) {
    throw new Error(message);
  }

  return value;
}

module.exports = async function (context, req) {
  context.log('/api/template call');

  const mongoUri = assert(process.env.MONGO_CONNECTION_STRING, 'MONGO_CONNECTION_STRING not defined');
  const facebookAppId = assert(process.env.FACEBOOK_APP_ID, 'FACEBOOK_APP_ID not defined');
  const facebookAppSecret = assert(process.env.FACEBOOK_APP_SECRET, 'FACEBOOK_APP_SECRET not defined');
  const accessToken = assert(req.headers.accesstoken, 'Missing accesstoken in the request headers');
  const userId = assert(req.headers.userid, 'Missing userid in the request headers');

  const response = await axios.get('https://graph.facebook.com/debug_token', {
    params: {
      input_token: accessToken,
      access_token: `${facebookAppId}|${facebookAppSecret}`,
    }
  });

  // Confirm that the response is valid
  if (response.status !== 200
    && response.data.data.app_id !== facebookAppId) {
    throw new Error('Invalid response');
  }

  // Confirm that the user is valid
  if (response.data.data.is_valid !== true
    && response.data.data.app_id !== facebookAppId
    && response.data.data.user_id !== userId) {
    throw new Error('Invalid user');
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

    context.res = {
      body: await results.toArray(),
    };
  }
  finally {
    await client.close();
  }
}
