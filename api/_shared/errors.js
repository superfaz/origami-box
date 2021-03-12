class SystemError extends Error {}

class UserError extends Error {}

async function errorMiddleware(context, req, next) {
  try {
    await next(context, req);
  } catch (error) {
    if (error instanceof UserError) {
      context.log.warn("User request invalid", error);
      context.res = {
        status: 400,
        body: { error: error.message },
      };
    } else if (error instanceof SystemError) {
      context.log.error("Configuration issue", error);
      context.res = {
        status: 500,
        body: { error: "Misconfiguration of the API" },
      };
    } else {
      context.log.error("Unplanned error", error);
      context.res = {
        status: 500,
        body: { error: "System error in the API" },
      };
    }
  }
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

module.exports = {
  SystemError,
  UserError,
  errorMiddleware,
  assertSystem,
  assertUser,
};
