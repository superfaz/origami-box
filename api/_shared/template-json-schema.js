// Can't retrieve it from the uuid library (available in regex.js)
// 14th char forced to 4 to comply with uuid v4 format
const uuidv4Regex =
  "^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$";

const textSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    key: { type: "string", format: "uuidv4" },
    face: {
      type: "string",
      enum: [
        "top",
        "back",
        "front",
        "left",
        "right",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
      ],
    },
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
    face: {
      type: "string",
      enum: [
        "top",
        "back",
        "front",
        "left",
        "right",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
      ],
    },
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

const baggiBaseSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    key: { type: "string", enum: ["base"] },
    rectoColor: { type: "string", format: "color" },
    versoColor: { type: "string", format: "color" },
    rectoImage: { type: ["null", "string"], format: "data-url" },
    versoImage: { type: ["null", "string"], format: "data-url" },
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
  required: ["key", "rectoColor", "versoColor"],
};

const masuBaseSchema = {
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

const masuLidSchema = {
  ...masuBaseSchema,
  properties: {
    ...masuBaseSchema.properties,
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

const baggiSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    pageFormat: { type: "string", enum: ["A4"] },
    length: { type: "number", minimum: 0 },
    width: { type: "number", minimum: 0 },
    withDesign: { type: "boolean" },
    base: baggiBaseSchema,
  },
  required: ["pageFormat", "length", "width", "withDesign", "base"],
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
    base: masuBaseSchema,
    lid: masuLidSchema,
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
    _id: { type: "string" },
    key: { type: "string", format: "uuidv4" },
    userId: { type: "string" },
    version: { type: "integer" },
    title: { type: "string" },
    savedate: { type: "integer", format: "date" },
    type: { type: "string", enum: ["masu", "baggi"] },
    data: { type: "object" },
  },
  anyOf: [
    {
      properties: { type: { const: "masu" }, data: masuSchema },
    },
    {
      properties: { type: { const: "baggi" }, data: baggiSchema },
    },
  ],
  required: ["key", "userId", "title", "savedate", "type", "data"],
};

module.exports = templateSchema;
