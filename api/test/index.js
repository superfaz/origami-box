const validData = require("./sample-valid.json");
const invalidData1 = require("./sample-invalid1.json");
const invalidData2 = require("./sample-invalid2.json");
const validate = require("../_shared/validate");

validate(validData)
  .then((result) => {
    console.log("template validation (should be valid):", result);
  })
  .then(() =>
    validate(invalidData1).then((result) => {
      console.log(
        "template validation (should be invalid due to schema):",
        result
      );
    })
  )
  .then(() =>
    validate(invalidData2).then((result) => {
      console.log(
        "template validation (should be invalid due to image):",
        result
      );
    })
  );
