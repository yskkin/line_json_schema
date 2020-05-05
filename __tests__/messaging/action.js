const { matchersWithOptions } = require('jest-json-schema');

const action = require('messaging/action.schema.json');

expect.extend(matchersWithOptions({ schemas: [action] }));

test('valid schema', () => {
    expect(action).toBeValidSchema();
    expect({ $ref: '#/definitions/postback' }).toBeValidSchema();
    expect({ $ref: '#/definitions/message' }).toBeValidSchema();
    expect({ $ref: '#/definitions/uri' }).toBeValidSchema();
    expect({ $ref: '#/definitions/datetimepicker' }).toBeValidSchema();
    expect({ $ref: '#/definitions/location' }).toBeValidSchema();
    expect({ $ref: '#/definitions/camera' }).toBeValidSchema();
    expect({ $ref: '#/definitions/cameraRoll' }).toBeValidSchema();
})

test('message', () => {
    expect({ type: 'message', text: '1' }).toMatchSchema(action);
});

test('postback', () => {
    expect({ type: 'postback', data: 'test data', displayText: 'test display text' }).toMatchSchema(action);
});

test('uri', () => {
    expect({ type: 'uri', uri: 'https://example.com' }).toMatchSchema(action);
});

test('datetimepicker', () => {
    expect({ type: 'datetimepicker', data: 'test data', mode: 'date' }).toMatchSchema(action);
    expect({ type: 'datetimepicker', data: 'test data', mode: 'time' }).toMatchSchema(action);
    expect({ type: 'datetimepicker', data: 'test data', mode: 'datetime' }).toMatchSchema(action);
});
