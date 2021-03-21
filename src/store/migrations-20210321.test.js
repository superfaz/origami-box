import migration20210321 from "./migrations-20210321";

describe("minimal template", () => {
  const initial = {
    title: "",
    version: 0,
    savedate: 0,
    local: true,
    type: "masu",
    data: {},
  };

  const actual = { ...initial };
  migration20210321.up(actual);

  it("migrates with no changes", () => {
    expect(actual).toEqual(initial);
  });
});

describe("full template", () => {
  const actual = require("./migrations-20210321.test.json");
  migration20210321.up(actual);

  it("didn't change the structure", () => {
    expect(actual).toHaveProperty("data.base");
    expect(actual).toHaveProperty("data.lid");
    expect(actual.data.base).toHaveProperty("texts");
    expect(actual.data.base).toHaveProperty("images", {});
    expect(actual.data.lid).toHaveProperty("texts");
    expect(actual.data.lid).toHaveProperty("images");
  });

  it("migrates base texts", () => {
    expect(actual.data.base.texts).toHaveProperty(
      "af500ad0-d47e-45e9-80f1-789f04bf3338.face",
      "2"
    );
    expect(actual.data.base.texts).toHaveProperty(
      "353d4119-0480-41d1-9b2c-fc134e7fca47.face",
      "0"
    );
    expect(actual.data.base.texts).toHaveProperty(
      "7a45651c-68dc-40d3-aa42-17fdf55fd144.face",
      "0"
    );
  });

  it("migrates lid texts", () => {
    expect(actual.data.lid.texts).toHaveProperty(
      "efa4ba5e-4b41-417d-82d1-4fdaac585b6a.face",
      "1"
    );
    expect(actual.data.lid.texts).toHaveProperty(
      "d9e19c2c-947c-4e6d-a480-38a0509fabb4.face",
      "0"
    );
    expect(actual.data.lid.texts).toHaveProperty(
      "eceb1344-b4e8-4e18-aae4-39ac9ca50ab7.face",
      "2"
    );
    expect(actual.data.lid.texts).toHaveProperty(
      "0c39baf4-c989-4aae-b0a7-44f75eb0d38e.face",
      "0"
    );
    expect(actual.data.lid.texts).toHaveProperty(
      "c475a7d7-cc9c-4306-b11c-173c274178cb.face",
      "3"
    );
    expect(actual.data.lid.texts).toHaveProperty(
      "b5b4901e-6f14-491b-9e49-19976f9f3510.face",
      "4"
    );
  });

  it("migrates lid images", () => {
    expect(actual.data.lid.images).toHaveProperty(
      "72a229ea-0154-4f41-bc32-3e576fde74e2.face",
      "0"
    );
    expect(actual.data.lid.images).toHaveProperty(
      "2dcd6fcc-b52a-4868-9819-6a6ffe2279a0.face",
      "0"
    );
    expect(actual.data.lid.images).toHaveProperty(
      "fe4760c0-0aae-42c1-a908-f182db9845c8.face",
      "0"
    );
  });
});
