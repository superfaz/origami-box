const axios = require("axios").default;
const { SystemError, UserError, assertSystem } = require("./errors");

async function facebookApiCheckUserId(accessToken, userId) {
  const facebookAppId = assertSystem(
    process.env.FACEBOOK_APP_ID,
    "FACEBOOK_APP_ID not defined"
  );
  const facebookAppSecret = assertSystem(
    process.env.FACEBOOK_APP_SECRET,
    "FACEBOOK_APP_SECRET not defined"
  );

  if (process.env.NODE_ENV === "development") {
    return;
  }

  const response = await axios.get("https://graph.facebook.com/debug_token", {
    params: {
      input_token: accessToken,
      access_token: `${facebookAppId}|${facebookAppSecret}`,
    },
  });

  // Confirm that the response is valid
  if (response.status !== 200 || response.data.data.app_id !== facebookAppId) {
    throw new SystemError("Can't connect to facebook APIs");
  }

  // Confirm that the user is valid
  if (
    response.data.data.is_valid !== true &&
    response.data.data.app_id !== facebookAppId &&
    response.data.data.user_id !== userId
  ) {
    context.log.info(response.data);
    throw new UserError("Invalid user");
  }
}

module.exports = {
  facebookApiCheckUserId,
};
