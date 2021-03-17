const validData = require("./sample-valid.json");
const invalidData = require("./sample-invalid.json");
const validate = require("../_shared/validate");

console.log("schema validation:", validate(validData));
console.log("schema validation:", validate(invalidData));
