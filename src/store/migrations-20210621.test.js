import migration20210621 from "./migrations-20210621";

describe("color conversion", () => {
  it("doesn't change null value", () => {
    expect(migration20210621.convertColor(null)).toEqual(null);
  });
  it("doesn't change undefined value", () => {
    expect(migration20210621.convertColor(undefined)).toEqual(undefined);
  });
  it("doesn't change empty string value", () => {
    expect(migration20210621.convertColor("")).toEqual("");
  });
  it("convert text colors", () => {
    expect(migration20210621.convertColor("black")).toEqual("#000000");
    expect(migration20210621.convertColor("white")).toEqual("#ffffff");
    expect(migration20210621.convertColor("orange")).toEqual("#ffa500");
  });
});

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
  migration20210621.up(actual);

  it("migrates with no changes", () => {
    expect(actual).toEqual(initial);
  });
});

describe("full template", () => {
  const actual = require("./migrations-20210621.test.json");
  migration20210621.up(actual);

  it("didn't change the structure", () => {
    expect(actual).toHaveProperty("data.base");
    expect(actual).toHaveProperty("data.lid");
    expect(actual.data.base).toHaveProperty("texts");
    expect(actual.data.base).toHaveProperty("images", {});
    expect(actual.data.lid).toHaveProperty("texts");
    expect(actual.data.lid).toHaveProperty("images");
  });

  it("migrates background colors", () => {
    expect(actual.data.base.background).toEqual("#ffffff");
    expect(actual.data.lid.background).toEqual("#ffffff");
  });

  it("migrates base texts colors", () => {
    expect(
      actual.data.base.texts["af500ad0-d47e-45e9-80f1-789f04bf3338"].color
    ).toEqual("#000000");
    expect(
      actual.data.base.texts["353d4119-0480-41d1-9b2c-fc134e7fca47"].color
    ).toEqual("#000000");
    expect(
      actual.data.base.texts["7a45651c-68dc-40d3-aa42-17fdf55fd144"].color
    ).toEqual("#000000");
  });

  it("migrates lid texts colors", () => {
    expect(
      actual.data.lid.texts["efa4ba5e-4b41-417d-82d1-4fdaac585b6a"].color
    ).toEqual("#000000");
    expect(
      actual.data.lid.texts["d9e19c2c-947c-4e6d-a480-38a0509fabb4"].color
    ).toEqual("#000000");
    expect(
      actual.data.lid.texts["eceb1344-b4e8-4e18-aae4-39ac9ca50ab7"].color
    ).toEqual("#000000");
    expect(
      actual.data.lid.texts["0c39baf4-c989-4aae-b0a7-44f75eb0d38e"].color
    ).toEqual("#000000");
    expect(
      actual.data.lid.texts["c475a7d7-cc9c-4306-b11c-173c274178cb"].color
    ).toEqual("#000000");
    expect(
      actual.data.lid.texts["b5b4901e-6f14-491b-9e49-19976f9f3510"].color
    ).toEqual("#000000");
  });
});
