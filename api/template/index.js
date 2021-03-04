const { MongoClient } = require("mongodb");

module.exports = async function (context, req) {
  context.log('/api/template call');

  const uri = process.env.MONGO_CONNECTION_STRING;
  if (uri === undefined || uri === null) {
    throw new Error('MONGO_CONNECTION_STRING not defined');
  }

  const client = new MongoClient(uri, {
    useUnifiedTopology: true
  });

  try {
    await client.connect();

    const database = client.db('application');
    const templates = database.collection('templates');

    const query = { type: 'masu' };
    const results = templates.find(query);

    context.res = {
      body: await results.toArray(),
    };
  }
  finally {
    await client.close();
  }
}
