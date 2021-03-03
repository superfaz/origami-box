module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  context.res = {
    body: [
      { id: 1, name: 'My template', type: 'masu', savedate: '01/02/2023' }
    ]
  };
}
