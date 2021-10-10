# ts-interface-keys-transformer-plugin

`ts-interface-keys-transformer-plugin` is developed again on the basis of [`ts-interface-keys-transformer`](https://www.npmjs.com/package/ts-interface-keys-transformer).

It parses the interface information during the compilation phase of TypeScript.

About feature:

- Supports resolving nested, inherited and self referenced interfaces
- The information of other referenced interfaces will be parsed together

## Output

```typescript

export interface PropertyType {
    /**
     * Possible values are:
     * 
     * unknown、array、string、number、boolean、Function、Array、Set、Map、symbol、any、null、object、
     * parenthesized、undefined、bigint、symbol、reference other interfaces
     */
    type: string;
    /**
     * If it is one of the types set, map, array, array and parenthesized,
     * it will contain other types referenced by itself.
     * If there are multiple reference types, they are stored in the order they appear.
     * @example
     * 
     * { field: Map<Symbol, number> } => Symbol, number
     * { field: Set<B> } => B
     * { field: Cat[] } => Cat
     * { field: Array<{ a: number }> } => object
     */
    elementType?: PropertyType[];
    isParenthesizedType?: boolean;
    isEnumType?: boolean;
}

/**
 * field information contained in interface
 */
export interface Property {
    name: string;
    modifiers: string[];
    optional: boolean;
    type: PropertyType[];
    /**
     * If the type of value contains a reference type, its information will also be resolved.
     * @example
     *  interface Cat {
     *      name: string;
     *  }
     *  interface Foo {
     *      cat: Cat
     *  }
     *  console.log(keys<Foo>()); // Cat information will be stored in the valueInterface field
     */
    valueInterface?: InterfaceInfo[];
    docComment: string;
    jsDocTags: ts.JSDocTagInfo[];
    /**
     * When the field value is an enumeration member type, it is used to store the corresponding enumeration value.
     * @example
     *  enum AnimalType {
     *      Cat = 2
     *  }
     *  enumTypeValue = `2`
     */
    enumTypeValue?: string;
}

export interface InterfaceInfo {
    /** interface name */
    name: string;
    /** original name，eg：type A = B, name is A，originalName is B */
    originalName: string;
    properties: Property[];
    docComment: string;
    jsDocTags: ts.JSDocTagInfo[];
}

```

## Usage

```bash
$ npm i -D typescript ttypescript ts-interface-keys-transformer-plugin
```

and then add following to "compilerOptions" field in tsconfig.json:

```json
"plugins": [
        { "transform": "ts-interface-keys-transformer-plugin/transformer" }
    ]
```

Use following command to run (assume index.js is the compiled file of index.ts):

```bash
$ ttsc -p tsconfig.json && node index.js
```

### Example

```typescript
import { keys } from 'ts-interface-keys-transformer-plugin';

interface Foo {
    [key: string]: string | number;
};

// {
//     name: `Foo`,
//     properties: [
//         {
//             name: `__index`,
//             modifiers: [],
//             optional: true,
//             type: [{ type: `string` }, { type: `number` }],
//             docComment: ``,
//             jsDocTags: []
//         }
//     ],
//     originalName: `Foo`,
//     docComment: ``,
//     jsDocTags: []
// }
console.log(keys<Foo>());
```


```typescript
import { keys } from 'ts-interface-keys-transformer-plugin';

interface Foo {
    /**
     * any field
     * @min 10
     */
    [key: string]: { a: string, b?: SSnake; }[];
};

// {
//     name: `Foo`,
//     properties: [
//         {
//             name: `__index`,
//             modifiers: [],
//             optional: true,
//             type: [{ type: `array`, elementType: [{ type: `object` }] }],
//             docComment: `any field`,
//             jsDocTags: [{ name: `min`, text: '10' }],
//             valueInterface: [
//                 {
//                     name: `__type`,
//                     originalName: `__type`,
//                     properties: [
//                         {
//                             name: `a`,
//                             modifiers: [],
//                             optional: false,
//                             type: [{ type: `string` }],
//                             docComment: ``,
//                             jsDocTags: []
//                         },
//                         {
//                             name: `b`,
//                             modifiers: [],
//                             optional: true,
//                             type: [{ type: `SSnake`, isEnumType: false }],
//                             docComment: ``,
//                             jsDocTags: [],
//                             valueInterface: [
//                                 {
//                                     name: `SSnake`,
//                                     originalName: `Snake`,
//                                     properties: [{
//                                         name: `s`,
//                                         modifiers: [],
//                                         optional: false,
//                                         type: [{ type: `number` }],
//                                         docComment: ``,
//                                         jsDocTags: []
//                                     }],
//                                     docComment: ``,
//                                     jsDocTags: []
//                                 }
//                             ]
//                         }
//                     ],
//                     docComment: ``,
//                     jsDocTags: []
//                 }
//             ]
//         }
//     ],
//     originalName: `Foo`,
//     docComment: ``,
//     jsDocTags: []
// }
console.log(keys<Foo>());
```

See more test cases in [Tests](./test/transformer.test.ts)

## Build

```bash
npm run build
```

## Run Tests

```bash
npm test
```
