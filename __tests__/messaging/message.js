const { matchersWithOptions } = require("jest-json-schema");

const message = require("messaging/message.schema.json");
const action = require("messaging/action.schema.json");

expect.extend(matchersWithOptions({ schemas: [action] }));

test("with sender", () => {
  const sticker = { type: "sticker", packageId: "1", stickerId: "1" };
  expect({
    ...sticker,
    sender: { name: "foo", iconUrl: "https://example.org/icon.jpg" },
  }).toMatchSchema(message);
  expect({
    ...sticker,
    sender: { iconUrl: "https://example.org/icon.jpg" },
  }).toMatchSchema(message);
  expect({ ...sticker, sender: { name: "foo" } }).toMatchSchema(message);
  expect({
    ...sticker,
    sender: {
      name: "this_name_is_too_long_to_be_valid",
      iconUrl: "https://example.org/icon.jpg",
    },
  }).not.toMatchSchema(message);
  expect({
    ...sticker,
    sender: { name: "foo", iconUrl: "http://example.org/icon.jpg" },
  }).not.toMatchSchema(message);
  expect({
    ...sticker,
    sender: { name: "foo", iconUrl: "invalid_url" },
  }).not.toMatchSchema(message);
  expect({
    ...sticker,
    sender: {
      name: "foo",
      iconUrl: `https://${Array(1000).fill("a").join("")}`,
    },
  }).not.toMatchSchema(message);
  expect({
    ...sticker,
    sender2: { name: "foo", iconUrl: "https://example.org/icon.jpg" },
  }).not.toMatchSchema(message);
});

test("with quickReply", () => {
  const sticker = { type: "sticker", packageId: "1", stickerId: "1" };
  expect({
    ...sticker,
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "postback",
            label: "test label",
            data: "test data",
            displayText: "test message",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "test label",
            text: "test message",
          },
        },
        {
          type: "action",
          action: {
            type: "uri",
            label: "test label",
            uri: "https://example.com",
          },
        },
        {
          type: "action",
          action: {
            type: "datetimepicker",
            label: "test label",
            data: "test data",
            mode: "date",
          },
        },
        {
          type: "action",
          action: {
            type: "datetimepicker",
            label: "test label",
            data: "test data",
            mode: "time",
          },
        },
        {
          type: "action",
          action: {
            type: "datetimepicker",
            label: "test label",
            data: "test data",
            mode: "datetime",
            initial: "2020-01-01T12:34:56",
          },
        },
        { type: "action", action: { type: "location", label: "test label" } },
        { type: "action", action: { type: "camera", label: "test label" } },
        { type: "action", action: { type: "cameraRoll", label: "test label" } },
      ],
    },
  }).toMatchSchema(message);
});

test("sticker message", () => {
  expect({ type: "sticker", packageId: "1", stickerId: "1" }).toMatchSchema(
    message
  );
  expect({ type: "sticker" }).not.toMatchSchema(message);
  expect({
    type: "sticker2",
    packageId: "1",
    stickerId: "1",
  }).not.toMatchSchema(message);
  expect({ type: "sticker", packageId: "1" }).not.toMatchSchema(message);
  expect({ type: "sticker", stickerId: "1" }).not.toMatchSchema(message);
  expect({ type: "sticker", packageId: "1", stickerId: 1 }).not.toMatchSchema(
    message
  );
});

test("valid text message", () => {
  expect({ type: "text", text: "test message" }).toMatchSchema(message);
  expect({
    type: "text",
    text: "text $ message",
    emojis: [
      { index: 5, productId: "test_product_id", emojiId: "test_emoji_id" },
    ],
  });
});

test("invalid text message", () => {
  expect({ type: "text" }).not.toMatchSchema(message);
  expect({
    type: "text",
    text: Array(2001).fill("a").join(""),
  }).not.toMatchSchema(message);
  expect({
    type: "text",
    text: "$",
    emojis: [{ index: 0, productId: "a" }],
  }).not.toMatchSchema(message);
  expect({
    type: "text",
    text: Array(21).fill("$").join(""),
    emojis: Array(21).map((_, i) => ({
      index: i,
      productId: "a",
      emojiId: "a",
    })),
  }).not.toMatchSchema(message);
});

test("valid image message", () => {
  expect({
    type: "image",
    originalContentUrl: "https://example.org/example.jpg",
    previewImageUrl: "https://example.org/example.jpg",
  }).toMatchSchema(message);
});

test("invalid image message", () => {
  expect({
    type: "image",
    originalContentUrl: "https://example.org/example.jpg",
  }).not.toMatchSchema(message);
  expect({
    type: "image",
    originalContentUrl: "http://example.org/example.jpg",
    previewImageUrl: "https://example.org/example.jpg",
  }).not.toMatchSchema(message);
  expect({
    type: "image",
    originalContentUrl: "https://example.org/example.jpg",
    previewImageUrl: "http://example.org/example.jpg",
  }).not.toMatchSchema(message);
  expect({
    type: "image",
    originalContentUrl: `https://example.org/${Array(1000)
      .fill("a")
      .join("")}.jpg`,
    previewImageUrl: "https://example.org/example.jpg",
  }).not.toMatchSchema(message);
  expect({
    type: "image",
    originalContentUrl: "https://example.org/example.jpg",
    previewImageUrl: `https://example.org/${Array(1000)
      .fill("a")
      .join("")}.jpg`,
  }).not.toMatchSchema(message);
});

test("valid video message", () => {
  expect({
    type: "video",
    originalContentUrl: "https://example.org/example.jpg",
    previewImageUrl: "https://example.org/example.jpg",
  }).toMatchSchema(message);
});

test("invalid video message", () => {
  expect({
    type: "video",
    originalContentUrl: "https://example.org/example.jpg",
  }).not.toMatchSchema(message);
  expect({
    type: "video",
    originalContentUrl: "http://example.org/example.jpg",
    previewImageUrl: "https://example.org/example.jpg",
  }).not.toMatchSchema(message);
  expect({
    type: "video",
    originalContentUrl: "https://example.org/example.jpg",
    previewImageUrl: "http://example.org/example.jpg",
  }).not.toMatchSchema(message);
  expect({
    type: "video",
    originalContentUrl: `https://example.org/${Array(1000)
      .fill("a")
      .join("")}.jpg`,
    previewImageUrl: "https://example.org/example.jpg",
  }).not.toMatchSchema(message);
  expect({
    type: "video",
    originalContentUrl: "https://example.org/example.jpg",
    previewImageUrl: `https://example.org/${Array(1000)
      .fill("a")
      .join("")}.jpg`,
  }).not.toMatchSchema(message);
});

test("valid audio message", () => {
  expect({
    type: "audio",
    originalContentUrl: "https://example.org/example.jpg",
    duration: 32.4,
  }).toMatchSchema(message);
});

test("invalid audio message", () => {
  expect({
    type: "audio",
    originalContentUrl: "https://example.org/example.jpg",
  }).not.toMatchSchema(message);
  expect({
    type: "audio",
    originalContentUrl: "http://example.org/example.jpg",
    duration: 42,
  }).not.toMatchSchema(message);
  expect({
    type: "audio",
    originalContentUrl: "https://example.org/example.jpg",
    duration: "http://example.org/example.jpg",
  }).not.toMatchSchema(message);
  expect({
    type: "audio",
    originalContentUrl: `https://example.org/${Array(1000)
      .fill("a")
      .join("")}.jpg`,
    duration: 42,
  }).not.toMatchSchema(message);
});

test("valid location message", () => {
  expect({
    type: "location",
    address: "foo",
    title: "bar",
    latitude: 10,
    longitude: 20,
  }).toMatchSchema(message);
});

test("invalid location message", () => {
  expect({
    type: "location",
    title: "bar",
    latitude: 42,
    longitude: 42,
  }).not.toMatchSchema(message);
  expect({
    type: "location",
    address: "bar",
    latitude: 42,
    longitude: 42,
  }).not.toMatchSchema(message);
  expect({
    type: "location",
    title: "foo",
    address: "bar",
    latitude: 42,
  }).not.toMatchSchema(message);
  expect({
    type: "location",
    title: "foo",
    address: "bar",
    longitude: 42,
  }).not.toMatchSchema(message);
});

test("valid imagemap message", () => {
  expect({
    type: "imagemap",
    baseUrl: "https://example.com/foo.jpg",
    altText: "test alt text",
    baseSize: { width: 1040, height: 520 },
    actions: [
      {
        type: "uri",
        label: "test label",
        linkUri: "tel:+81312345678",
        area: {
          x: 0,
          y: 0,
          width: 100,
          height: 50,
        },
      },
      {
        type: "message",
        label: "test label2",
        text: "test message",
        area: {
          x: 100,
          y: 0,
          width: 100,
          height: 50,
        },
      },
    ],
  }).toMatchSchema(message);
  expect({
    type: "imagemap",
    baseUrl: "https://example.com/foo.jpg",
    altText: "test alt text",
    baseSize: { width: 1040, height: 520 },
    video: {
      originalContentUrl: "https://example.com/bar.mp4",
      previewImageUrl: "https://example.com/bar.jpg",
      area: {
        x: 0,
        y: 0,
        width: 1040,
        height: 500,
      },
    },
    actions: [
      {
        type: "uri",
        label: "test label",
        linkUri: "https://example.com/foo",
        area: {
          x: 100,
          y: 0,
          width: 100,
          height: 100,
        },
      },
    ],
  }).toMatchSchema(message);
});

test("invalid imagemap message", () => {
  expect({
    type: "imagemap",
    baseUrl: `https://example.com/${Array(1000).fill("a").join()}`,
    altText: "test alt text",
    baseSize: { width: 1040, height: 520 },
    actions: [
      {
        type: "uri",
        label: "test label",
        linkUri: "tel:+81312345678",
        area: {
          x: 0,
          y: 0,
          width: 100,
          height: 50,
        },
      },
      {
        type: "message",
        label: "test label2",
        text: "test message",
        area: {
          x: 100,
          y: 0,
          width: 100,
          height: 50,
        },
      },
    ],
  }).not.toMatchSchema(message);
  expect({
    type: "imagemap",
    baseUrl: "https://example.com/foo.jpg",
    altText: "",
    baseSize: { width: 1040, height: 520 },
    video: {
      originalContentUrl: "https://example.com/bar.mp4",
      previewImageUrl: "https://example.com/bar.jpg",
      area: {
        x: 0,
        y: 0,
        width: 1040,
        height: 500,
      },
    },
    actions: [
      {
        type: "uri",
        label: "test label",
        linkUri: "https://example.com/foo",
        area: {
          x: 100,
          y: 0,
          width: 100,
          height: 100,
        },
      },
    ],
  }).not.toMatchSchema(message);
});
