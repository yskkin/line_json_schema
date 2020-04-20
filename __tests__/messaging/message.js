const jestJsonSchema = require('jest-json-schema');
expect.extend(jestJsonSchema.matchers);

const message = require('messaging/message.schema.json');

test('with sender', () => {
    const sticker = { type: 'sticker', packageId: '1', stickerId: '1' };
    expect({ ...sticker, sender: { name: 'foo', iconUrl: 'https://example.org/icon.jpg' }}).toMatchSchema(message);
    expect({ ...sticker, sender: { iconUrl: 'https://example.org/icon.jpg' }}).toMatchSchema(message);
    expect({ ...sticker, sender: { name: 'foo' }}).toMatchSchema(message);
    expect({ ...sticker, sender: { name: 'this_name_is_too_long_to_be_valid', iconUrl: 'https://example.org/icon.jpg' }}).not.toMatchSchema(message);
    expect({ ...sticker, sender: { name: 'foo', iconUrl: 'http://example.org/icon.jpg' }}).not.toMatchSchema(message);
    expect({ ...sticker, sender: { name: 'foo', iconUrl: 'invalid_url' }}).not.toMatchSchema(message);
    expect({ ...sticker, sender: { name: 'foo', iconUrl: `https://${Array(1000).fill('a').join('')}` }}).not.toMatchSchema(message);
    expect({ ...sticker, sender2: { name: 'foo', iconUrl: 'https://example.org/icon.jpg' }}).not.toMatchSchema(message);
});

test('sticker message', () => {
    expect({ type: 'sticker', packageId: '1', stickerId: '1' }).toMatchSchema(message);
    expect({ type: 'sticker' }).not.toMatchSchema(message);
    expect({ type: 'sticker2', packageId: '1', stickerId: '1' }).not.toMatchSchema(message);
    expect({ type: 'sticker', packageId: '1' }).not.toMatchSchema(message);
    expect({ type: 'sticker', stickerId: '1' }).not.toMatchSchema(message);
    expect({ type: 'sticker', packageId: '1', stickerId: 1 }).not.toMatchSchema(message);
});
