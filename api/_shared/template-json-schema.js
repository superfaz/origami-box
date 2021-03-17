// Can't retrieve it from the uuid library (available in regex.js)
// 14th char forced to 4 to comply with uuid v4 format
const uuidv4Regex =
  "^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$";

const textSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    key: { type: "string", format: "uuidv4" },
    face: { type: "string", enum: ["top", "back", "front", "left", "right"] },
    horizontal: { type: "string", enum: ["left", "center", "right"] },
    vertical: { type: "string", enum: ["top", "middle", "bottom"] },
    marginHorizontal: { type: "number" },
    marginVertical: { type: "number" },
    content: { type: "string" },
    lineSpacing: { type: "number" },
    family: { type: ["string", "null"] },
    size: { type: "number", minimum: 0 },
    color: { type: "string", format: "color" },
  },
  required: [
    "key",
    "content",
    "face",
    "horizontal",
    "vertical",
    "marginHorizontal",
    "marginVertical",
    "lineSpacing",
    "family",
    "size",
    "color",
  ],
};

const imageSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    key: { type: "string", format: "uuidv4" },
    face: { type: "string", enum: ["top", "back", "front", "left", "right"] },
    horizontal: { type: "string", enum: ["left", "center", "right"] },
    vertical: { type: "string", enum: ["top", "middle", "bottom"] },
    marginHorizontal: { type: "number" },
    marginVertical: { type: "number" },
    content: { type: "string", format: "data-url" },
    originalWidth: { type: "number", minimum: 1 },
    originalHeight: { type: "number", minimum: 1 },
    size: { type: "string", enum: ["manual", "auto"] },
    width: {
      anyOf: [
        { type: "number", minimum: 0 },
        { type: "string", enum: [""] },
      ],
    },
    height: {
      anyOf: [
        { type: "number", minimum: 0 },
        { type: "string", enum: [""] },
      ],
    },
  },
  required: [
    "key",
    "face",
    "horizontal",
    "vertical",
    "marginHorizontal",
    "marginVertical",
    "content",
    "originalWidth",
    "originalHeight",
    "size",
    "width",
    "height",
  ],
};

const baseSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    key: { type: "string", enum: ["base"] },
    background: { type: "string", format: "color" },
    backgroundImage: { type: ["null", "string"], format: "data-url" },
    texts: {
      type: "object",
      additionalProperties: false,
      patternProperties: { [uuidv4Regex]: textSchema },
    },
    images: {
      type: "object",
      additionalProperties: false,
      patternProperties: { [uuidv4Regex]: imageSchema },
    },
  },
  required: ["key", "background", "backgroundImage", "texts", "images"],
};

const lidSchema = {
  ...baseSchema,
  properties: {
    ...baseSchema.properties,
    key: { type: "string", enum: ["lid"] },
    delta: { type: "number", minimum: 0 },
    height: {
      anyOf: [
        { type: "number", minimum: 0 },
        { type: "string", enum: [""] },
      ],
    },
  },
};

const masuSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    pageFormat: { type: "string", enum: ["A4"] },
    length: { type: "number", minimum: 0 },
    width: { type: "number", minimum: 0 },
    height: { type: "number", minimum: 0 },
    withDesign: { type: "boolean" },
    withLid: { type: "boolean" },
    base: baseSchema,
    lid: lidSchema,
  },
  required: [
    "pageFormat",
    "length",
    "width",
    "height",
    "withDesign",
    "withLid",
    "base",
  ],
};

const templateSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    key: { type: "string", format: "uuidv4" },
    userId: { type: "string" },
    title: { type: "string" },
    savedate: { type: "integer", format: "date" },
    type: { type: "string", enum: ["masu"] },
    data: masuSchema,
  },
  required: ["key", "userId", "title", "savedate", "type", "data"],
};

module.exports = templateSchema;
