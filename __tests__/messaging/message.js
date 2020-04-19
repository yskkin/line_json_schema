const jestJsonSchema = require('jest-json-schema');
expect.extend(jestJsonSchema.matchers);

const message = require('messaging/message.schema.json');

test('sticker message', () => {
    expect({ type: 'sticker', packageId: '1', stickerId: '1' }).toMatchSchema(message);
    expect({ type: 'sticker' }).not.toMatchSchema(message);
    expect({ type: 'sticker2', packageId: '1', stickerId: '1' }).not.toMatchSchema(message);
    expect({ type: 'sticker', packageId: '1' }).not.toMatchSchema(message);
    expect({ type: 'sticker', stickerId: '1' }).not.toMatchSchema(message);
    expect({ type: 'sticker', packageId: '1', stickerId: 1 }).not.toMatchSchema(message);
});
