const { matchersWithOptions }= require('jest-json-schema');

const message = require('messaging/message.schema.json');
const action = require('messaging/action.schema.json');

expect.extend(matchersWithOptions({ schemas: [action]}));

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

test('with quickReply', () => {
    const sticker = { type: 'sticker', packageId: '1', stickerId: '1' };
    expect({ ...sticker, quickReply: {
        items: [
            { type: 'action', action: { type: 'postback', label: 'test label', data: 'test data', displayText: 'test message' } },
            { type: 'action', action: { type: 'message', label: 'test label', text: 'test message' } },
            { type: 'action', action: { type: 'uri', label: 'test label', uri: 'https://example.com' } },
            { type: 'action', action: { type: 'datetimepicker', label: 'test label', data: 'test data', mode: 'date' }},
            { type: 'action', action: { type: 'datetimepicker', label: 'test label', data: 'test data', mode: 'time' }},
            { type: 'action', action: { type: 'datetimepicker', label: 'test label', data: 'test data', mode: 'datetime', initial: '2020-01-01T12:34:56' }},
            { type: 'action', action: { type: 'location', label: 'test label' } },
            { type: 'action', action: { type: 'camera', label: 'test label' } },
            { type: 'action', action: { type: 'cameraRoll', label: 'test label' } }
        ]

    }}).toMatchSchema(message);
});

test('sticker message', () => {
    expect({ type: 'sticker', packageId: '1', stickerId: '1' }).toMatchSchema(message);
    expect({ type: 'sticker' }).not.toMatchSchema(message);
    expect({ type: 'sticker2', packageId: '1', stickerId: '1' }).not.toMatchSchema(message);
    expect({ type: 'sticker', packageId: '1' }).not.toMatchSchema(message);
    expect({ type: 'sticker', stickerId: '1' }).not.toMatchSchema(message);
    expect({ type: 'sticker', packageId: '1', stickerId: 1 }).not.toMatchSchema(message);
});
