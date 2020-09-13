const { matchersWithOptions }= require('jest-json-schema');

const message = require('messaging/message.schema.json');
const action = require('messaging/action.schema.json');

expect.extend(matchersWithOptions({ schemas: [action]}));

test('invalid template type', () => {
    expect({
        type: "template",
        altText: 'this is invalid',
        template: {
            type: 'invalid'
        }
    }).not.toMatchSchema(message);
});

test('invalid altText', () => {
    expect({
        "type": "template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            "title": "Menu",
            "text": "Please select",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/123"
            },
            "actions": [
                {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                }
            ]
        }
    }).not.toMatchSchema(message);
});

test('valid button template', () => {
    expect({
        "type": "template",
        "altText": "This is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "Menu",
            "text": "Please select",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/123"
            },
            "actions": [
                {
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                },
                {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                },
                {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                }
            ]
        }
    }).toMatchSchema(message);
});

test('invalid button template', () => {
    expect({
        type: 'template',
        "altText": "This is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "Menu",
            "text": "Please select",
            "defaultAction": {
                // missing type
                "label": "View detail",
                "uri": "http://example.com/page/123"
            },
            "actions": [
                {
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                },
                {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                },
                {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                }
            ]
        }
    }).not.toMatchSchema(message);
});

test('valid confirm template', () => {
    expect({
            "type": "template",
            "altText": "this is a confirm template",
            "template": {
                "type": "confirm",
                "text": "Are you sure?",
                "actions": [
                    {
                        "type": "message",
                        "label": "Yes",
                        "text": "yes"
                    },
                    {
                        "type": "message",
                        "label": "No",
                        "text": "no"
                    }
                ]
            }
    }).toMatchSchema(message);
});

test('invalid confirm template', () => {
    expect({
        "type": "template",
        "altText": "this is a confirm template",
        "template": {
            "type": "confirm",
            // missing text
            "actions": [
                {
                    "type": "message",
                    "label": "Yes",
                    "text": "yes"
                },
                {
                    "type": "message",
                    "label": "No",
                    "text": "no"
                }
            ]
        }
    }).not.toMatchSchema(message);
});

test('valid carousel template', () => {
    expect({
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
            "type": "carousel",
            "columns": [
                {
                    "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
                    "imageBackgroundColor": "#FFFFFF",
                    "title": "this is menu",
                    "text": "description",
                    "defaultAction": {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/123"
                    },
                    "actions": [
                        {
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=111"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=111"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "http://example.com/page/111"
                        }
                    ]
                },
                {
                    "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
                    "imageBackgroundColor": "#000000",
                    "title": "this is menu",
                    "text": "description",
                    "defaultAction": {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/222"
                    },
                    "actions": [
                        {
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=222"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=222"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "http://example.com/page/222"
                        }
                    ]
                }
            ],
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
        }
    }).toMatchSchema(message);
});

test('invalid carousel template', () => {
    expect({
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
            "type": "carousel",
            "columns": [
                {
                    "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
                    "imageBackgroundColor": "#FFFFFF",
                    "title": "this is menu",
                    // text is missing
                    "defaultAction": {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/123"
                    },
                    "actions": [
                        {
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=111"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=111"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "http://example.com/page/111"
                        }
                    ]
                }
            ],
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
        }
    }).not.toMatchSchema(message);
});

test('valid image carousel message', () => {
    expect({
        "type": "template",
        "altText": "this is a image carousel template",
        "template": {
            "type": "image_carousel",
            "columns": [
                {
                    "imageUrl": "https://example.com/bot/images/item1.jpg",
                    "action": {
                        "type": "postback",
                        "label": "Buy",
                        "data": "action=buy&itemid=111"
                    }
                },
                {
                    "imageUrl": "https://example.com/bot/images/item2.jpg",
                    "action": {
                        "type": "message",
                        "label": "Yes",
                        "text": "yes"
                    }
                },
                {
                    "imageUrl": "https://example.com/bot/images/item3.jpg",
                    "action": {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/222"
                    }
                }
            ]
        }
    }).toMatchSchema(message);
});


test('invalid image carousel message', () => {
    expect({
        "type": "template",
        "altText": "this is a image carousel template",
        "template": {
            "type": "image_carousel",
            "columns": [
                {
                    "imageUrl": "https://example.com/bot/images/item1.jpg",
                    // missing action
                }
            ]
        }
    }).not.toMatchSchema(message);
});
