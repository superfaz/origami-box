const Ajv = require("ajv").default;
const schema = require("./template-json-schema");
const colorString = require("color-string");
const { version: uuidVersion, validate: uuidValidate } = require("uuid");
const parseDataUrl = require("parse-data-url");

const ajv = new Ajv();
ajv
  .addFormat("uuidv4", (data) => {
    return uuidValidate(data) && uuidVersion(data) === 4;
  })
  .addFormat("date", (data) => {
    return new Date(data).getTime() === data;
  })
  .addFormat("color", (data) => {
    return colorString.get(data) !== null;
  })
  .addFormat("data-url", (data) => {
    const parsed = parseDataUrl(data);
    if (parsed) {
      const contentType = parsed.contentType;
      return ["image/svg+xml", "image/png", "image/jpeg"].includes(contentType);
    } else {
      return false;
    }
  });

function validateImage(dataUrl) {}

function validate(jsonData) {
  // Validate the overall schema
  const jsonValidate = ajv.compile(schema);
  const jsonIsValid = jsonValidate(jsonData);
  if (!jsonIsValid) {
    return { valid: false, reason: "Json invalid", error: jsonValidate.errors };
  }

  // Validate the background data urls for base and lid
  if (jsonData.data.base && jsonData.data.base.backgroundImage) {
    const status = validateImage(jsonData.data.base.backgroundImage);
    if (!status.isValid) {
      return {
        valid: false,
        reason: "Base background image invalid",
        error: status.error,
      };
    }
  }
  if (jsonData.data.lid && jsonData.data.lid.backgroundImage) {
    const status = validateImage(jsonData.data.lid.backgroundImage);
    if (!status.isValid) {
      return {
        valid: false,
        reason: "Lid background image invalid",
        error: status.error,
      };
    }
  }

  // Validate face images

  return { valid: true };
}

module.exports = validate;
