const { matchersWithOptions } = require("jest-json-schema");

const message = require("messaging/message.schema.json");
const action = require("messaging/action.schema.json");

expect.extend(matchersWithOptions({ schemas: [action] }));

test("invalid flex type", () => {
  expect({
    type: "flex",
    altText: "this is invalid",
    notExistProperty: {
      type: "invalid",
    },
  }).not.toMatchSchema(message);
});

test("invalid altText", () => {
  expect({
    type: "flex",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "hello",
          },
          {
            type: "text",
            text: "world",
          },
        ],
      },
    },
  }).not.toMatchSchema(message);
});

test("valid flex with bubble body", () => {
  expect({
    type: "flex",
    altText: "this is a flex message",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "hello",
          },
          {
            type: "text",
            text: "world",
          },
        ],
      },
    },
  }).toMatchSchema(message);
});

test("valid carousel message", () => {
  expect({
    type: "flex",
    altText: "this is alt text",
    contents: {
      type: "carousel",
      contents: [
        {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "First bubble",
              },
            ],
          },
        },
        {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "Second bubble",
              },
            ],
          },
        },
      ],
    },
  });
});
