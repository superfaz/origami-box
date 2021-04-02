import classNames from "classnames/dedupe";

export function checkValidity(target) {
  if (target.checkValidity()) {
    target.className = classNames(target.className, "is-valid", {
      "is-invalid": false,
    });
  } else {
    target.className = classNames(target.className, "is-invalid", {
      "is-valid": false,
    });
  }

  if (target.value === "" || target.value === null) {
    return target.value;
  }

  if (target.type === "number") {
    const number = Number(target.value);
    if (!isNaN(number)) {
      return number;
    }
  }

  return target.value;
}
