import { keys } from '../';
import { SSnake, FairyMountain, AnimalType, Snake, Pig as APig } from './declareA';

describe('Test transformer.', () => {
    test('[key: string]: string | number - union type', () => {
        interface Foo {
            [key: string]: string | number;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `string` }, { type: `number` }],
                    docComment: ``,
                    jsDocTags: []
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: string - single type', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: string;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `string` }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: FairyMountain.Dog - module declaration + interface declaration', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: FairyMountain.Dog;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `FairyMountain.Dog`, isEnumType: false }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `FairyMountain.Dog`,
                            originalName: `Dog`,
                            properties: [{
                                name: `d`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `BNameSpace.Cat`, isEnumType: false }],
                                docComment: ``,
                                jsDocTags: [],
                                valueInterface: [
                                    {
                                        name: `BNameSpace.Cat`,
                                        originalName: `Cat`,
                                        properties: [
                                            {
                                                name: `c`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }
                                        ]
                                    }
                                ]
                            }]
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: Snake - interface declaration', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: Snake;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `Snake`, isEnumType: false }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `Snake`,
                            originalName: `Snake`,
                            properties: [{
                                name: `s`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `number` }],
                                docComment: ``,
                                jsDocTags: []
                            }]
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: SSnake - type alias declaration', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: SSnake;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `SSnake`, isEnumType: false }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `SSnake`,
                            originalName: `Snake`,
                            properties: [{
                                name: `s`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `number` }],
                                docComment: ``,
                                jsDocTags: []
                            }]
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: AnimalType - enum declaration', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: AnimalType;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `AnimalType`, isEnumType: true }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `AnimalType`,
                            originalName: `AnimalType`,
                            properties: [
                                {
                                    name: `Dog`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string`, isEnumType: true }],
                                    docComment: `dog`,
                                    jsDocTags: [{ name: `min`, text: '10' }],
                                    enumTypeValue: `1`
                                },
                                {
                                    name: `Cat`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    enumTypeValue: `2`
                                }
                            ]
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: AnimalType[] - enum array', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: AnimalType[];
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `array`, elementType: [{ type: `AnimalType`, isEnumType: true }] }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `AnimalType`,
                            originalName: `AnimalType`,
                            properties: [
                                {
                                    name: `Dog`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string`, isEnumType: true }],
                                    docComment: `dog`,
                                    jsDocTags: [{ name: `min`, text: '10' }],
                                    enumTypeValue: `1`
                                },
                                {
                                    name: `Cat`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    enumTypeValue: `2`
                                }
                            ]
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: AnimalType.Cat - enum member', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: AnimalType.Cat;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `AnimalType.Cat`, isEnumType: true }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `AnimalType.Cat`,
                            originalName: `Cat`,
                            properties: [
                                {
                                    name: `Cat`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    enumTypeValue: `2`
                                }
                            ]
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: string | (AnimalType | Snake)[] - union type + parenthesized type', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: string | (AnimalType | Snake)[];
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [
                        { type: `string` },
                        { type: `array`, elementType: [{ type: `parenthesized`, elementType: [{ type: 'AnimalType', isEnumType: true }, { type: `Snake`, isEnumType: false }], isParenthesizedType: true }] }
                    ],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `AnimalType`,
                            originalName: `AnimalType`,
                            properties: [
                                {
                                    name: `Dog`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string`, isEnumType: true }],
                                    docComment: `dog`,
                                    jsDocTags: [{ name: `min`, text: '10' }],
                                    enumTypeValue: `1`
                                },
                                {
                                    name: `Cat`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    enumTypeValue: `2`
                                }
                            ]
                        },
                        {
                            name: `Snake`,
                            originalName: `Snake`,
                            properties: [
                                {
                                    name: `s`,
                                    modifiers: [],
                                    optional: false,
                                    type: [ { type: 'number' } ],
                                    docComment: '',
                                    jsDocTags: []
                                }
                            ],
                            docComment: ``,
                            jsDocTags: []
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: SSnake[] - array type', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: SSnake[];
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `array`, elementType: [{ type: `SSnake`, isEnumType: false }] }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `SSnake`,
                            originalName: `Snake`,
                            properties: [{
                                name: `s`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `number` }],
                                docComment: ``,
                                jsDocTags: []
                            }],
                            docComment: ``,
                            jsDocTags: []
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: { a: string, b: SSnake; } - type literal', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: { a: string, b?: SSnake; };
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `object` }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `__type`,
                            originalName: `__type`,
                            properties: [
                                {
                                    name: `a`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string` }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `b`,
                                    modifiers: [],
                                    optional: true,
                                    type: [{ type: `SSnake`, isEnumType: false }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `SSnake`,
                                            originalName: `Snake`,
                                            properties: [{
                                                name: `s`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }],
                                            docComment: ``,
                                            jsDocTags: []
                                        }
                                    ]
                                }
                            ],
                            docComment: ``,
                            jsDocTags: []
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: { a: string, b: SSnake; }[] - type literal - array', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: { a: string, b?: SSnake; }[];
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `array`, elementType: [{ type: `object` }] }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `__type`,
                            originalName: `__type`,
                            properties: [
                                {
                                    name: `a`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string` }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `b`,
                                    modifiers: [],
                                    optional: true,
                                    type: [{ type: `SSnake`, isEnumType: false }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `SSnake`,
                                            originalName: `Snake`,
                                            properties: [{
                                                name: `s`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }],
                                            docComment: ``,
                                            jsDocTags: []
                                        }
                                    ]
                                }
                            ],
                            docComment: ``,
                            jsDocTags: []
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: { a: string, b?: SSnake; } | string | FairyMountain.Cat | Snake[] - type literal - union type', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: { a: string, b?: SSnake; } | string | FairyMountain.Cat | Snake[] | AnimalType;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `object` }, { type: `string` }, { type: `FairyMountain.Cat`, isEnumType: false }, { type: 'array', elementType: [ { type: `Snake`, isEnumType: false } ] }, { type: `AnimalType`, isEnumType: true }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `__type`,
                            originalName: `__type`,
                            properties: [
                                {
                                    name: `a`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string` }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `b`,
                                    modifiers: [],
                                    optional: true,
                                    type: [{ type: `SSnake`, isEnumType: false }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `SSnake`,
                                            originalName: `Snake`,
                                            properties: [{
                                                name: `s`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }],
                                            docComment: ``,
                                            jsDocTags: []
                                        }
                                    ]
                                }
                            ],
                            docComment: ``,
                            jsDocTags: []
                        },
                        {
                            name: `FairyMountain.Cat`,
                            originalName: `Cat`,
                            properties: [
                                {
                                    name: `a`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number` }],
                                    docComment: `A's prop`,
                                    jsDocTags: [],
                                },
                                {
                                    name: `type`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `AnimalType.Cat`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `AnimalType.Cat`,
                                            originalName: `Cat`,
                                            docComment: ``,
                                            jsDocTags: [],
                                            properties: [
                                                {
                                                    name: `Cat`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `number`, isEnumType: true }],
                                                    docComment: ``,
                                                    jsDocTags: [],
                                                    enumTypeValue: `2`
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            docComment: ``,
                            jsDocTags: [],
                        },
                        {
                            name: `Snake`,
                            originalName: `Snake`,
                            properties: [{
                                name: `s`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `number` }],
                                docComment: ``,
                                jsDocTags: []
                            }],
                            docComment: ``,
                            jsDocTags: []
                        },
                        {
                            name: `AnimalType`,
                            originalName: `AnimalType`,
                            properties: [
                                {
                                    name: `Dog`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string`, isEnumType: true }],
                                    docComment: `dog`,
                                    jsDocTags: [{ name: `min`, text: '10' }],
                                    enumTypeValue: `1`
                                },
                                {
                                    name: `Cat`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    enumTypeValue: `2`
                                }
                            ]
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('[key: string]: Array<SSnake | { a: { a1: number; a2: FairyMountain.Dog; a3: AnimalType[], a4: { a41: string; a42: FairyMountain.Cat; } } }>', () => {
        interface Foo {
            /**
             * any field
             * @min 10
             */
            [key: string]: Array<SSnake | { a: { a1: number; a2: FairyMountain.Dog; a3: AnimalType[], a4: { a41: string; a42: FairyMountain.Cat; } } }>;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `__index`,
                    modifiers: [],
                    optional: true,
                    type: [{ type: `Array`, elementType: [{ type: `SSnake`, isEnumType: false }, { type: 'object' }] }],
                    docComment: `any field`,
                    jsDocTags: [{ name: `min`, text: '10' }],
                    valueInterface: [
                        {
                            name: `SSnake`,
                            originalName: `Snake`,
                            properties: [{
                                name: `s`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `number` }],
                                docComment: ``,
                                jsDocTags: []
                            }],
                            docComment: ``,
                            jsDocTags: []
                        },
                        {
                            name: `__type`,
                            originalName: `__type`,
                            properties: [
                                {
                                    name: `a`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: 'object' }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `__type`,
                                            originalName: `__type`,
                                            properties: [
                                                {
                                                    name: `a1`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `number` }],
                                                    docComment: ``,
                                                    jsDocTags: [],
                                                },
                                                {
                                                    name: `a2`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `FairyMountain.Dog`, isEnumType: false }],
                                                    docComment: ``,
                                                    jsDocTags: [],
                                                    valueInterface: [
                                                        {
                                                            name: `FairyMountain.Dog`,
                                                            originalName: `Dog`,
                                                            properties: [{
                                                                name: `d`,
                                                                modifiers: [],
                                                                optional: false,
                                                                type: [{ type: `BNameSpace.Cat`, isEnumType: false }],
                                                                docComment: ``,
                                                                jsDocTags: [],
                                                                valueInterface: [
                                                                    {
                                                                        name: `BNameSpace.Cat`,
                                                                        originalName: `Cat`,
                                                                        properties: [
                                                                            {
                                                                                name: `c`,
                                                                                modifiers: [],
                                                                                optional: false,
                                                                                type: [{ type: `number` }],
                                                                                docComment: ``,
                                                                                jsDocTags: []
                                                                            }
                                                                        ],
                                                                        docComment: '',
                                                                        jsDocTags: [],
                                                                    }
                                                                ]
                                                            }],
                                                            docComment: '',
                                                            jsDocTags: [],
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: `a3`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: 'array', elementType: [{ type: `AnimalType`, isEnumType: true }] }],
                                                    docComment: ``,
                                                    jsDocTags: [],
                                                    valueInterface: [
                                                        {
                                                            name: `AnimalType`,
                                                            originalName: `AnimalType`,
                                                            properties: [
                                                                {
                                                                    name: `Dog`,
                                                                    modifiers: [],
                                                                    optional: false,
                                                                    type: [{ type: `string`, isEnumType: true }],
                                                                    docComment: `dog`,
                                                                    jsDocTags: [{ name: `min`, text: '10' }],
                                                                    enumTypeValue: `1`
                                                                },
                                                                {
                                                                    name: `Cat`,
                                                                    modifiers: [],
                                                                    optional: false,
                                                                    type: [{ type: `number`, isEnumType: true }],
                                                                    docComment: ``,
                                                                    jsDocTags: [],
                                                                    enumTypeValue: `2`
                                                                }
                                                            ],
                                                            docComment: '',
                                                            jsDocTags: [],
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: `a4`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: 'object' }],
                                                    docComment: ``,
                                                    jsDocTags: [],
                                                    valueInterface: [
                                                        {
                                                            name: `__type`,
                                                            originalName: `__type`,
                                                            properties: [
                                                                {
                                                                    name: `a41`,
                                                                    modifiers: [],
                                                                    optional: false,
                                                                    type: [{ type: 'string' }],
                                                                    docComment: ``,
                                                                    jsDocTags: [], 
                                                                },
                                                                {
                                                                    name: `a42`,
                                                                    modifiers: [],
                                                                    optional: false,
                                                                    type: [{ type: 'FairyMountain.Cat', isEnumType: false }],
                                                                    docComment: ``,
                                                                    jsDocTags: [],
                                                                    valueInterface: [
                                                                        {
                                                                            name: `FairyMountain.Cat`,
                                                                            originalName: `Cat`,
                                                                            properties: [
                                                                                {
                                                                                    name: `a`,
                                                                                    modifiers: [],
                                                                                    optional: false,
                                                                                    type: [{ type: `number` }],
                                                                                    docComment: `A's prop`,
                                                                                    jsDocTags: [],
                                                                                },
                                                                                {
                                                                                    name: `type`,
                                                                                    modifiers: [],
                                                                                    optional: false,
                                                                                    type: [{ type: `AnimalType.Cat`, isEnumType: true }],
                                                                                    docComment: ``,
                                                                                    jsDocTags: [],
                                                                                    valueInterface: [
                                                                                        {
                                                                                            name: `AnimalType.Cat`,
                                                                                            originalName: `Cat`,
                                                                                            docComment: ``,
                                                                                            jsDocTags: [],
                                                                                            properties: [
                                                                                                {
                                                                                                    name: `Cat`,
                                                                                                    modifiers: [],
                                                                                                    optional: false,
                                                                                                    type: [{ type: `number`, isEnumType: true }],
                                                                                                    docComment: ``,
                                                                                                    jsDocTags: [],
                                                                                                    enumTypeValue: `2`
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ],
                                                                            docComment: ``,
                                                                            jsDocTags: [],
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            docComment: ``,
                                                            jsDocTags: []
                                                        }
                                                    ]
                                                }
                                            ],
                                            docComment: ``,
                                            jsDocTags: []
                                        }
                                    ]
                                }
                            ],
                            docComment: ``,
                            jsDocTags: []
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });

    test('a: string | number; - union type', () => {
        interface Foo {
            a: string | number;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `a`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `string` }, { type: `number` }],
                    docComment: ``,
                    jsDocTags: []
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('a: boolean; - single type', () => {
        interface Foo {
            a: boolean;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `a`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `boolean` }],
                    docComment: ``,
                    jsDocTags: []
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('extends', () => {
        interface Parent {
            a: undefined;
            b: null;
            c: bigint;
            d: string;
            e: number;
            f: symbol;
            g: Symbol;
            h: Map<Symbol, number>;
            i: Map<Symbol, SSnake>;
            j: AnimalType;
            k: AnimalType.Cat;
            l: Set<boolean>;
            m: Set<AnimalType>;
            n: Set<FairyMountain.Dog>;
            o: APig;
            p: APig[];
            q: Array<APig>;
            /** test */
            r: Array<{ a: symbol; }> | (SSnake | Snake)[];
            s: { [key: string]: SSnake };
        }
        /** Foo */
        interface Foo extends Parent {
            /** extends */
            aa: boolean;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `aa`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `boolean` }],
                    docComment: `extends`,
                    jsDocTags: []
                },
                {
                    name: `a`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `undefined` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `b`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `null` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `c`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `bigint` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `d`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `string` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `e`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `number` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `f`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `symbol` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `g`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `symbol` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `h`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Map`, elementType: [{ type: 'symbol' }, { type: `number` }] }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `i`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Map`, elementType: [{ type: 'symbol' }, { type: `SSnake`, isEnumType: false }] }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `SSnake`,
                            originalName: `Snake`,
                            properties: [{
                                name: `s`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `number` }],
                                docComment: ``,
                                jsDocTags: []
                            }]
                        }
                    ]
                },
                {
                    name: `j`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `AnimalType`, isEnumType: true }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `AnimalType`,
                            originalName: `AnimalType`,
                            properties: [
                                {
                                    name: `Dog`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string`, isEnumType: true }],
                                    docComment: `dog`,
                                    jsDocTags: [{ name: `min`, text: '10' }],
                                    enumTypeValue: `1`
                                },
                                {
                                    name: `Cat`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    enumTypeValue: `2`
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `k`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `AnimalType.Cat`, isEnumType: true }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `AnimalType.Cat`,
                            originalName: `Cat`,
                            properties: [
                                {
                                    name: `Cat`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    enumTypeValue: `2`
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `l`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Set`, elementType: [{ type: 'boolean' }] }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `m`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Set`, elementType: [{ type: 'AnimalType', isEnumType: true }] }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `AnimalType`,
                            originalName: `AnimalType`,
                            properties: [
                                {
                                    name: `Dog`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string`, isEnumType: true }],
                                    docComment: `dog`,
                                    jsDocTags: [{ name: `min`, text: '10' }],
                                    enumTypeValue: `1`
                                },
                                {
                                    name: `Cat`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    enumTypeValue: `2`
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `n`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Set`, elementType: [{ type: 'FairyMountain.Dog', isEnumType: false }] }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `FairyMountain.Dog`,
                            originalName: `Dog`,
                            properties: [{
                                name: `d`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `BNameSpace.Cat`, isEnumType: false }],
                                docComment: ``,
                                jsDocTags: [],
                                valueInterface: [
                                    {
                                        name: `BNameSpace.Cat`,
                                        originalName: `Cat`,
                                        properties: [
                                            {
                                                name: `c`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }
                                        ]
                                    }
                                ]
                            }]
                        }
                    ]
                },
                {
                    name: `o`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `APig` }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `APig`,
                            originalName: `Pig`,
                            docComment: ``,
                            jsDocTags: [],
                            properties: [
                                {
                                    name: `p`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string` }],
                                    docComment: ``,
                                    jsDocTags: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `p`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `array`, elementType: [{ type: `APig`, isEnumType: false }] }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `APig`,
                            originalName: `Pig`,
                            docComment: ``,
                            jsDocTags: [],
                            properties: [
                                {
                                    name: `p`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string` }],
                                    docComment: ``,
                                    jsDocTags: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `q`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Array`, elementType: [{ type: `APig`, isEnumType: false }] }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `APig`,
                            originalName: `Pig`,
                            docComment: ``,
                            jsDocTags: [],
                            properties: [
                                {
                                    name: `p`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string` }],
                                    docComment: ``,
                                    jsDocTags: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `r`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Array`, elementType: [{ type: `object` }] }, { type: `array`, elementType: [{ type: `parenthesized`, elementType: [{ type: `SSnake`, isEnumType: false }, { type: `Snake`, isEnumType: false }], isParenthesizedType: true }] }],
                    docComment: `test`,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `__type`,
                            originalName: `__type`,
                            docComment: ``,
                            jsDocTags: [],
                            properties: [
                                {
                                    name: `a`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `symbol` }],
                                    docComment: ``,
                                    jsDocTags: []
                                }
                            ]
                        },
                        {
                            name: `SSnake`,
                            originalName: `Snake`,
                            properties: [{
                                name: `s`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `number` }],
                                docComment: ``,
                                jsDocTags: []
                            }]
                        },
                        {
                            name: `Snake`,
                            originalName: `Snake`,
                            properties: [{
                                name: `s`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `number` }],
                                docComment: ``,
                                jsDocTags: []
                            }]
                        }
                    ]
                },
                {
                    name: `s`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `object` }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `__type`,
                            originalName: `__type`,
                            properties: [
                                {
                                    name: `__index`,
                                    modifiers: [],
                                    type: [{ type: `SSnake`, isEnumType: false }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `SSnake`,
                                            originalName: `Snake`,
                                            properties: [{
                                                name: `s`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }],
                                            docComment: ``,
                                            jsDocTags: []
                                        }
                                    ]
                                }
                            ],
                            docComment: ``,
                            jsDocTags: []
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: `Foo`,
            jsDocTags: []
        });
    });
    test('a: FairyMountain.Dog; - module declaration + interface declaration', () => {
        interface Foo {
            a: FairyMountain.Dog;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `a`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `FairyMountain.Dog`, isEnumType: false }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `FairyMountain.Dog`,
                            originalName: `Dog`,
                            properties: [{
                                name: `d`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `BNameSpace.Cat`, isEnumType: false }],
                                docComment: ``,
                                jsDocTags: [],
                                valueInterface: [
                                    {
                                        name: `BNameSpace.Cat`,
                                        originalName: `Cat`,
                                        properties: [
                                            {
                                                name: `c`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }
                                        ]
                                    }
                                ]
                            }]
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('a: Foo; - self reference', () => {
        interface Foo {
            a: Foo;
        };
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `a`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Foo` }],
                    docComment: ``,
                    jsDocTags: []
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('a: Foo; - circular reference', () => {
        interface FooB {
            a: FooA;
        };
        interface FooA {
            b: FooB;
        }
        expect(keys<FooB>()).toMatchObject({
            name: `FooB`,
            properties: [
                {
                    name: `a`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `FooA` }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `FooA`,
                            originalName: `FooA`,
                            docComment: ``,
                            jsDocTags: [],
                            properties: [
                                {
                                    name: `b`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `FooB` }],
                                    docComment: ``,
                                    jsDocTags: [], 
                                }
                            ]
                        }
                    ]
                }
            ],
            originalName: `FooB`,
            docComment: ``,
            jsDocTags: []
        });
    });
    test('all', () => {
        interface Foo {
            a: undefined;
            b: null;
            c: bigint;
            d: string;
            e: number;
            f: symbol;
            g: Symbol;
            h: Map<Symbol, number>;
            i: Map<Symbol, SSnake>;
            j: AnimalType;
            k: AnimalType.Cat;
            l: Set<boolean>;
            m: Set<AnimalType>;
            n: Set<FairyMountain.Dog>;
            o: APig;
            p: APig[];
            q: Array<APig>;
            /** test */
            r: Array<{ a: symbol; }> | (SSnake | Snake)[];
            s: { [key: string]: SSnake };
            t: {
                a: undefined;
                b: null;
                c: bigint;
                d: string;
                readonly e: number;
                f: symbol;
                g: Symbol;
                h: Map<Symbol, number>;
                i: Map<Symbol, SSnake>;
                j: AnimalType;
                k: AnimalType.Cat;
                l: Set<boolean>;
                m: Set<AnimalType>;
                n: Set<FairyMountain.Dog>;
                o: APig;
                p: APig[];
                q: Array<APig>;
                /** test */
                r: Array<{ a: symbol; }> | (SSnake | Snake)[];
                s: { [key: string]: SSnake };
            };
        };
        keys<Foo>();
        expect(keys<Foo>()).toMatchObject({
            name: `Foo`,
            properties: [
                {
                    name: `a`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `undefined` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `b`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `null` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `c`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `bigint` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `d`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `string` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `e`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `number` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `f`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `symbol` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `g`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `symbol` }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `h`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Map`, elementType: [{ type: 'symbol' }, { type: `number` }] }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `i`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Map`, elementType: [{ type: 'symbol' }, { type: `SSnake`, isEnumType: false }] }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `SSnake`,
                            originalName: `Snake`,
                            properties: [{
                                name: `s`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `number` }],
                                docComment: ``,
                                jsDocTags: []
                            }]
                        }
                    ]
                },
                {
                    name: `j`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `AnimalType`, isEnumType: true }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `AnimalType`,
                            originalName: `AnimalType`,
                            properties: [
                                {
                                    name: `Dog`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string`, isEnumType: true }],
                                    docComment: `dog`,
                                    jsDocTags: [{ name: `min`, text: '10' }],
                                    enumTypeValue: `1`
                                },
                                {
                                    name: `Cat`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    enumTypeValue: `2`
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `k`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `AnimalType.Cat`, isEnumType: true }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `AnimalType.Cat`,
                            originalName: `Cat`,
                            properties: [
                                {
                                    name: `Cat`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    enumTypeValue: `2`
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `l`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Set`, elementType: [{ type: 'boolean' }] }],
                    docComment: ``,
                    jsDocTags: []
                },
                {
                    name: `m`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Set`, elementType: [{ type: 'AnimalType', isEnumType: true }] }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `AnimalType`,
                            originalName: `AnimalType`,
                            properties: [
                                {
                                    name: `Dog`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string`, isEnumType: true }],
                                    docComment: `dog`,
                                    jsDocTags: [{ name: `min`, text: '10' }],
                                    enumTypeValue: `1`
                                },
                                {
                                    name: `Cat`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `number`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    enumTypeValue: `2`
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `n`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Set`, elementType: [{ type: 'FairyMountain.Dog', isEnumType: false }] }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `FairyMountain.Dog`,
                            originalName: `Dog`,
                            properties: [{
                                name: `d`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `BNameSpace.Cat`, isEnumType: false }],
                                docComment: ``,
                                jsDocTags: [],
                                valueInterface: [
                                    {
                                        name: `BNameSpace.Cat`,
                                        originalName: `Cat`,
                                        properties: [
                                            {
                                                name: `c`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }
                                        ]
                                    }
                                ]
                            }]
                        }
                    ]
                },
                {
                    name: `o`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `APig` }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `APig`,
                            originalName: `Pig`,
                            docComment: ``,
                            jsDocTags: [],
                            properties: [
                                {
                                    name: `p`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string` }],
                                    docComment: ``,
                                    jsDocTags: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `p`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `array`, elementType: [{ type: `APig`, isEnumType: false }] }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `APig`,
                            originalName: `Pig`,
                            docComment: ``,
                            jsDocTags: [],
                            properties: [
                                {
                                    name: `p`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string` }],
                                    docComment: ``,
                                    jsDocTags: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `q`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Array`, elementType: [{ type: `APig`, isEnumType: false }] }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `APig`,
                            originalName: `Pig`,
                            docComment: ``,
                            jsDocTags: [],
                            properties: [
                                {
                                    name: `p`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string` }],
                                    docComment: ``,
                                    jsDocTags: []
                                }
                            ]
                        }
                    ]
                },
                {
                    name: `r`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `Array`, elementType: [{ type: `object` }] }, { type: `array`, elementType: [{ type: `parenthesized`, elementType: [{ type: `SSnake`, isEnumType: false }, { type: `Snake`, isEnumType: false }], isParenthesizedType: true }] }],
                    docComment: `test`,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `__type`,
                            originalName: `__type`,
                            docComment: ``,
                            jsDocTags: [],
                            properties: [
                                {
                                    name: `a`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `symbol` }],
                                    docComment: ``,
                                    jsDocTags: []
                                }
                            ]
                        },
                        {
                            name: `SSnake`,
                            originalName: `Snake`,
                            properties: [{
                                name: `s`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `number` }],
                                docComment: ``,
                                jsDocTags: []
                            }]
                        },
                        {
                            name: `Snake`,
                            originalName: `Snake`,
                            properties: [{
                                name: `s`,
                                modifiers: [],
                                optional: false,
                                type: [{ type: `number` }],
                                docComment: ``,
                                jsDocTags: []
                            }]
                        }
                    ]
                },
                {
                    name: `s`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `object` }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: `__type`,
                            originalName: `__type`,
                            properties: [
                                {
                                    name: `__index`,
                                    modifiers: [],
                                    type: [{ type: `SSnake`, isEnumType: false }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `SSnake`,
                                            originalName: `Snake`,
                                            properties: [{
                                                name: `s`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }],
                                            docComment: ``,
                                            jsDocTags: []
                                        }
                                    ]
                                }
                            ],
                            docComment: ``,
                            jsDocTags: []
                        }
                    ]
                },
                {
                    name: `t`,
                    modifiers: [],
                    optional: false,
                    type: [{ type: `object` }],
                    docComment: ``,
                    jsDocTags: [],
                    valueInterface: [
                        {
                            name: '__type',
                            originalName: '__type',
                            docComment: ``,
                            jsDocTags: [],
                            properties: [
                                {
                                    name: `a`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `undefined` }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `b`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `null` }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `c`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `bigint` }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `d`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `string` }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `e`,
                                    modifiers: [ 'readonly' ],
                                    optional: false,
                                    type: [{ type: `number` }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `f`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `symbol` }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `g`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `symbol` }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `h`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `Map`, elementType: [{ type: 'symbol' }, { type: `number` }] }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `i`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `Map`, elementType: [{ type: 'symbol' }, { type: `SSnake`, isEnumType: false }] }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `SSnake`,
                                            originalName: `Snake`,
                                            properties: [{
                                                name: `s`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }]
                                        }
                                    ]
                                },
                                {
                                    name: `j`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `AnimalType`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `AnimalType`,
                                            originalName: `AnimalType`,
                                            properties: [
                                                {
                                                    name: `Dog`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `string`, isEnumType: true }],
                                                    docComment: `dog`,
                                                    jsDocTags: [{ name: `min`, text: '10' }],
                                                    enumTypeValue: `1`
                                                },
                                                {
                                                    name: `Cat`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `number`, isEnumType: true }],
                                                    docComment: ``,
                                                    jsDocTags: [],
                                                    enumTypeValue: `2`
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: `k`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `AnimalType.Cat`, isEnumType: true }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `AnimalType.Cat`,
                                            originalName: `Cat`,
                                            properties: [
                                                {
                                                    name: `Cat`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `number`, isEnumType: true }],
                                                    docComment: ``,
                                                    jsDocTags: [],
                                                    enumTypeValue: `2`
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: `l`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `Set`, elementType: [{ type: 'boolean' }] }],
                                    docComment: ``,
                                    jsDocTags: []
                                },
                                {
                                    name: `m`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `Set`, elementType: [{ type: 'AnimalType', isEnumType: true }] }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `AnimalType`,
                                            originalName: `AnimalType`,
                                            properties: [
                                                {
                                                    name: `Dog`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `string`, isEnumType: true }],
                                                    docComment: `dog`,
                                                    jsDocTags: [{ name: `min`, text: '10' }],
                                                    enumTypeValue: `1`
                                                },
                                                {
                                                    name: `Cat`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `number`, isEnumType: true }],
                                                    docComment: ``,
                                                    jsDocTags: [],
                                                    enumTypeValue: `2`
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: `n`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `Set`, elementType: [{ type: 'FairyMountain.Dog', isEnumType: false }] }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `FairyMountain.Dog`,
                                            originalName: `Dog`,
                                            properties: [{
                                                name: `d`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `BNameSpace.Cat`, isEnumType: false }],
                                                docComment: ``,
                                                jsDocTags: [],
                                                valueInterface: [
                                                    {
                                                        name: `BNameSpace.Cat`,
                                                        originalName: `Cat`,
                                                        properties: [
                                                            {
                                                                name: `c`,
                                                                modifiers: [],
                                                                optional: false,
                                                                type: [{ type: `number` }],
                                                                docComment: ``,
                                                                jsDocTags: []
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }]
                                        }
                                    ]
                                },
                                {
                                    name: `o`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `APig` }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `APig`,
                                            originalName: `Pig`,
                                            docComment: ``,
                                            jsDocTags: [],
                                            properties: [
                                                {
                                                    name: `p`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `string` }],
                                                    docComment: ``,
                                                    jsDocTags: []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: `p`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `array`, elementType: [{ type: `APig`, isEnumType: false }] }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `APig`,
                                            originalName: `Pig`,
                                            docComment: ``,
                                            jsDocTags: [],
                                            properties: [
                                                {
                                                    name: `p`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `string` }],
                                                    docComment: ``,
                                                    jsDocTags: []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: `q`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `Array`, elementType: [{ type: `APig`, isEnumType: false }] }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `APig`,
                                            originalName: `Pig`,
                                            docComment: ``,
                                            jsDocTags: [],
                                            properties: [
                                                {
                                                    name: `p`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `string` }],
                                                    docComment: ``,
                                                    jsDocTags: []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: `r`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `Array`, elementType: [{ type: `object` }] }, { type: `array`, elementType: [{ type: `parenthesized`, elementType: [{ type: `SSnake`, isEnumType: false }, { type: `Snake`, isEnumType: false }], isParenthesizedType: true }] }],
                                    docComment: `test`,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `__type`,
                                            originalName: `__type`,
                                            docComment: ``,
                                            jsDocTags: [],
                                            properties: [
                                                {
                                                    name: `a`,
                                                    modifiers: [],
                                                    optional: false,
                                                    type: [{ type: `symbol` }],
                                                    docComment: ``,
                                                    jsDocTags: []
                                                }
                                            ]
                                        },
                                        {
                                            name: `SSnake`,
                                            originalName: `Snake`,
                                            properties: [{
                                                name: `s`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }]
                                        },
                                        {
                                            name: `Snake`,
                                            originalName: `Snake`,
                                            properties: [{
                                                name: `s`,
                                                modifiers: [],
                                                optional: false,
                                                type: [{ type: `number` }],
                                                docComment: ``,
                                                jsDocTags: []
                                            }]
                                        }
                                    ]
                                },
                                {
                                    name: `s`,
                                    modifiers: [],
                                    optional: false,
                                    type: [{ type: `object` }],
                                    docComment: ``,
                                    jsDocTags: [],
                                    valueInterface: [
                                        {
                                            name: `__type`,
                                            originalName: `__type`,
                                            properties: [
                                                {
                                                    name: `__index`,
                                                    modifiers: [],
                                                    type: [{ type: `SSnake`, isEnumType: false }],
                                                    docComment: ``,
                                                    jsDocTags: [],
                                                    valueInterface: [
                                                        {
                                                            name: `SSnake`,
                                                            originalName: `Snake`,
                                                            properties: [{
                                                                name: `s`,
                                                                modifiers: [],
                                                                optional: false,
                                                                type: [{ type: `number` }],
                                                                docComment: ``,
                                                                jsDocTags: []
                                                            }],
                                                            docComment: ``,
                                                            jsDocTags: []
                                                        }
                                                    ]
                                                }
                                            ],
                                            docComment: ``,
                                            jsDocTags: []
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ],
            originalName: `Foo`,
            docComment: ``,
            jsDocTags: []
        });
    });
});
