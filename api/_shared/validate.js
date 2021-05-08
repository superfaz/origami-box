const Ajv = require("ajv").default;
const schema = require("./template-json-schema");
const colorString = require("color-string");
const { version: uuidVersion, validate: uuidValidate } = require("uuid");
const parseDataUrl = require("parse-data-url");
const sharp = require("sharp");

const acceptedFormat = {
  svg: "image/svg+xml",
  png: "image/png",
  jpeg: "image/jpeg",
};
const acceptedMimeTypes = Object.keys(acceptedFormat).map(
  (k) => acceptedFormat[k]
);

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
      return acceptedMimeTypes.includes(contentType);
    } else {
      return false;
    }
  });

function getImages(block) {
  if (!block || !block.images) {
    return [];
  }

  return Object.keys(block.images).map((k) => block.images[k]);
}

async function validateImage(dataUrl) {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) {
    return { valid: false, error: "Can't be parsed" };
  }

  const contentType = parsed.contentType;
  const image = sharp(parsed.toBuffer());

  return image
    .metadata()
    .then(async (metadata) => {
      if (
        acceptedFormat[metadata.format] === undefined ||
        acceptedFormat[metadata.format] !== contentType
      ) {
        return {
          valid: false,
          error: "Invalid image format",
        };
      }

      return image
        .resize(200)
        .toBuffer()
        .then((data) => {
          return {
            valid: true,
            width: metadata.width,
            height: metadata.height,
          };
        })
        .catch((error) => {
          return {
            valid: false,
            error,
          };
        });
    })
    .catch((error) => {
      return {
        valid: false,
        error,
      };
    });
}

async function validate(jsonData) {
  // Validate the overall schema
  const jsonValidate = ajv.compile(schema);
  const jsonIsValid = jsonValidate(jsonData);
  if (!jsonIsValid) {
    return { valid: false, reason: "Json invalid", error: jsonValidate.errors };
  }

  // Validate the background data urls for base and lid
  if (jsonData.data.base && jsonData.data.base.backgroundImage) {
    const status = await validateImage(jsonData.data.base.backgroundImage);
    if (!status.valid) {
      return {
        valid: false,
        reason: "Base background image invalid",
        error: status.error,
      };
    }
  }
  if (jsonData.data.lid && jsonData.data.lid.backgroundImage) {
    const status = await validateImage(jsonData.data.lid.backgroundImage);
    if (!status.valid) {
      return {
        valid: false,
        reason: "Lid background image invalid",
        error: status.error,
      };
    }
  }

  // Validate blocks' images
  const promises = []
    .concat(getImages(jsonData.data.base), getImages(jsonData.data.lid))
    .map(async (image) => {
      const status = await validateImage(image.content);
      if (!status.valid) {
        return {
          valid: false,
          reason: "One of the image is invalid",
          error: status.error,
        };
      }
      if (image.originalHeight !== status.height) {
        return {
          valid: false,
          reason: "One of the image height is invalid",
          error: status.error,
        };
      }
      if (image.originalWidth !== status.width) {
        return {
          valid: false,
          reason: "One of the image width is invalid",
          error: status.error,
        };
      }

      return {
        valid: true,
      };
    });

  const results = await Promise.all(promises).then((results) =>
    results.filter((s) => !s.valid)
  );

  if (results.length > 0) {
    return results[0];
  } else {
    return { valid: true };
  }
}

module.exports = validate;
