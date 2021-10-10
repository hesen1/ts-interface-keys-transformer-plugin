import * as path from 'path';
import * as _ from 'lodash';
import * as ts from 'typescript';

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

export default (program: ts.Program): ts.TransformerFactory<ts.SourceFile> => {
    return (ctx: ts.TransformationContext) => {
        return (sourceFile: ts.SourceFile): ts.SourceFile => {
            const visitor = (node: ts.Node): ts.Node => {
                return ts.visitEachChild(visitNode(node, program), visitor, ctx);
            };
            return <ts.SourceFile> ts.visitEachChild(visitNode(sourceFile, program), visitor, ctx);
        };
    };
}

function visitNode(node: ts.Node, program: ts.Program): ts.Node {
    const typeChecker = program.getTypeChecker();
    if (!isKeysCallExpression(node, typeChecker)) {
        return node;
    }
    if (!node.typeArguments) {
        return ts.createArrayLiteral([]);
    }

    const type = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
    const parentSymbol = type.getSymbol();
    if (!parentSymbol) return node;

    const interfaceInfo = analysisSymbol(parentSymbol, typeChecker, node.typeArguments[0]['typeName']['escapedText']);
    if (interfaceInfo === undefined) return node;

    const assignments: ts.PropertyAssignment[] = [];
    assignments.push(ts.createPropertyAssignment(`name`, ts.createLiteral(interfaceInfo.name)));
    assignments.push(ts.createPropertyAssignment(`properties`, ts.createArrayLiteral(interfaceInfo.properties.map(property => ts.createRegularExpressionLiteral(JSON.stringify(property))))));
    assignments.push(ts.createPropertyAssignment(`docComment`, ts.createLiteral(interfaceInfo.docComment)));
    assignments.push(ts.createPropertyAssignment(`originalName`, ts.createLiteral(interfaceInfo.originalName)));
    assignments.push(ts.createPropertyAssignment(`jsDocTags`, ts.createArrayLiteral(interfaceInfo.jsDocTags.map(jsDocTag => ts.createRegularExpressionLiteral(JSON.stringify(jsDocTag))))));
    return ts.createObjectLiteral(assignments);
}

function getEnumProperties(symbol: ts.Symbol): Property {
    const p: Property = {
        name: symbol.getEscapedName().toString(),
        modifiers: [],
        optional: false,
        type: getPropertyType(symbol.valueDeclaration),
        docComment: ts.displayPartsToString(symbol.getDocumentationComment(undefined)),
        jsDocTags: symbol.getJsDocTags(),
        enumTypeValue: symbol.valueDeclaration['initializer']['text']
    };
    return p;
}

function analysisSymbol(symbol: ts.Symbol, typeChecker: ts.TypeChecker, nodeName?: string, rootSymbol?: ts.Symbol): InterfaceInfo | undefined {
    if (!symbol) return undefined;
    if (rootSymbol && rootSymbol['id'] === symbol['id']) {
        return undefined;
    } else if (!rootSymbol) {
        rootSymbol = symbol;
    }

    const interfaceInfo: InterfaceInfo = {
        name: nodeName || symbol.getEscapedName().toString(),
        properties: [],
        docComment: ts.displayPartsToString(symbol.getDocumentationComment(typeChecker)),// ts.displayPartsToString(),
        jsDocTags: symbol.getJsDocTags(),
        originalName: symbol.getEscapedName().toString()
    };
    const children = symbol.members; // typeChecker.getPropertiesOfType(type);
    if (children === undefined) {
        if (symbol['valueDeclaration'] && symbol['valueDeclaration'].kind === ts.SyntaxKind.EnumDeclaration) {
            symbol['valueDeclaration']['members'].map((childNode: ts.Node) => {
                if (!childNode) return;

                interfaceInfo.properties.push(getEnumProperties(childNode['symbol']));
            });
            return interfaceInfo;
        } else if (symbol['valueDeclaration'] && symbol['valueDeclaration']['kind'] === ts.SyntaxKind.EnumMember) {
            interfaceInfo.properties.push(getEnumProperties(symbol['valueDeclaration']['symbol']));
            return interfaceInfo;
        }
        return undefined;
    }

    children.forEach(child => {
        interfaceInfo.properties.push(...getSymbolProperties(child, typeChecker, rootSymbol as ts.Symbol));
    });
    symbol.declarations.forEach(node => {
        if (!node['heritageClauses']) return;
        for (const item of node['heritageClauses']) {
            if (!item.types) continue;

            item.types.forEach((type: any) => {
                const typeSymbol = typeChecker.getTypeFromTypeNode(type).symbol;
                if (!typeSymbol || !typeSymbol.members) return;

                typeSymbol.members.forEach(child => interfaceInfo.properties.push(...getSymbolProperties(child, typeChecker, rootSymbol as ts.Symbol)));
            });
        }
    });

    return interfaceInfo;
}

function getIndexSignature(symbol: ts.Symbol, typeChecker: ts.TypeChecker, rootSymbol: ts.Symbol): Property[] {
    const declarations = symbol.getDeclarations();
    if (!declarations) return [];

    const modifiers: string[] = [];
    declarations.forEach((declaration: any) => {
        if (declaration.modifiers) {
            declaration.modifiers.forEach((modifier: ts.Token<ts.SyntaxKind.ReadonlyKeyword>) => {
                modifiers.push(getModifierType(modifier));
            });
        }
    });

    const p: Property = {
        name: symbol.getEscapedName().toString(),
        modifiers: modifiers,
        optional: true,
        type: getPropertyType(declarations[0]['type'], typeChecker),
        docComment: ts.displayPartsToString(symbol.getDocumentationComment(typeChecker)),
        jsDocTags: symbol.getJsDocTags()
    };

    const childInterface = getRelatedObjectProperties(declarations[0]['type'], typeChecker, rootSymbol);
    childInterface ? p.valueInterface = childInterface : undefined;

    return [p];
}

function getRelatedObjectProperties(node: ts.TypeNode, typeChecker: ts.TypeChecker, rootSymbol: ts.Symbol): InterfaceInfo[] | undefined {
    const children: InterfaceInfo[] = [];
    if (!node || !typeChecker) return undefined;
    if (isSymbolInterface(node, typeChecker)) return undefined;

    if (node['kind'] === ts.SyntaxKind.UnionType && node['types']) {
        for (const childNode of node['types']) {
            const childInterface = getRelatedObjectProperties(childNode, typeChecker, rootSymbol);
            childInterface ? children.push(...childInterface) : undefined;
        }
    } else if (node['kind'] === ts.SyntaxKind.TypeLiteral || node['kind'] === ts.SyntaxKind.TypeReference) {
        if (node['typeArguments']) {
            for (const childNode of node['typeArguments']) {
                const r = getRelatedObjectProperties(childNode, typeChecker, rootSymbol);
                r ? children.push(...r) : undefined;
            }
        } else {
            const typeSymbol = typeChecker.getTypeFromTypeNode(node).symbol;
            const childInterface = analysisSymbol(typeSymbol, typeChecker, getTypeReferenceNodeName(node), rootSymbol);
            childInterface ? children.push(childInterface) : undefined;
        }
    } else if (node['kind'] === ts.SyntaxKind.ArrayType) {
        if (node['elementType']['kind'] === ts.SyntaxKind.ParenthesizedType) return getRelatedObjectProperties(node['elementType']['type'], typeChecker, rootSymbol);

        const typeSymbol = typeChecker.getTypeFromTypeNode(node['elementType']).symbol;
        const childInterface = analysisSymbol(typeSymbol, typeChecker, getTypeReferenceNodeName(node['elementType']), rootSymbol);
        childInterface ? children.push(childInterface) : undefined;
    }

    return children.length ? children : undefined;
}

function isSymbolInterface(typeNode: ts.TypeNode, typeChecker?: ts.TypeChecker): boolean {
    if (!typeNode || !typeNode['typeName']) return false;
    if (!typeChecker) return false;

    const type = typeChecker.getTypeFromTypeNode(typeNode['typeName']);
    if (!type || !type.symbol || !type.symbol['type'] || !type.symbol['type']['checker']) return false;

    const symbolType = type.symbol['type']['checker'].getESSymbolType();
    return symbolType.intrinsicName === 'symbol';
}

function getSymbolProperties(symbol: ts.Symbol, typeChecker: ts.TypeChecker, rootSymbol: ts.Symbol): Property[] {
    let properties: Property[] = [];

    const optional = _.some(symbol.declarations, (declaration: ts.PropertyDeclaration) => {
        return !!declaration.questionToken;
    });
    const modifiers: string[] = [];
    let isIndexSignature: boolean = false;
    if (symbol.declarations) {
        symbol.declarations.forEach((declaration: any) => {
            if (declaration.modifiers) {
                declaration.modifiers.forEach((modifier: ts.Token<ts.SyntaxKind.ReadonlyKeyword>) => {
                    modifiers.push(getModifierType(modifier));
                });
            }
            if (declaration.kind === ts.SyntaxKind.IndexSignature) {
                isIndexSignature = true;
            }
        });
    }
    if (isIndexSignature) {
        properties.push(...getIndexSignature(symbol, typeChecker, rootSymbol));
        return properties;
    }
    const property: Property = {
        name: symbol.escapedName.toString(),
        modifiers,
        optional,
        type: getPropertyType(symbol.valueDeclaration ? symbol.valueDeclaration['type'] : symbol['type'], typeChecker),
        docComment: ts.displayPartsToString(symbol.getDocumentationComment(typeChecker)),
        jsDocTags: symbol.getJsDocTags()
    };

    const childInterface = getRelatedObjectProperties(symbol.valueDeclaration ? symbol.valueDeclaration['type'] : symbol['type'], typeChecker, rootSymbol);
    childInterface ? property.valueInterface = childInterface : undefined;

    properties.push(property);

    return properties;
}

function getTypeReferenceNodeName(node: ts.TypeNode): string {
    if (node.kind !== ts.SyntaxKind.TypeReference || !node['typeName']) return '';
    return node['typeName'].escapedText || node['typeName'].left.escapedText + `.` + node['typeName'].right.escapedText;
}

function isEnumType(symbol: any, typeChecker: ts.TypeChecker): boolean {
    if (!symbol || !symbol['typeName']) return false;
    const tempSymbol = typeChecker.getTypeFromTypeNode(symbol['typeName']).symbol;
    if (!tempSymbol || !tempSymbol['valueDeclaration']) return false;
    return tempSymbol['valueDeclaration']['kind'] === ts.SyntaxKind.EnumMember || tempSymbol['valueDeclaration']['kind'] === ts.SyntaxKind.EnumDeclaration;
}

function getPropertyType(symbol: any, typeChecker?: ts.TypeChecker): PropertyType[] {
    const types: PropertyType[] = [];

    if (symbol === undefined) {
        types.push({ type: `unknown` });
        return types;
    }
    if (symbol.intrinsicName) {
        types.push({ type: symbol.intrinsicName });
        return types;
    }
    if (symbol.types) {
        symbol.types.map((token: any) => types.push(...getPropertyType(token, typeChecker)));
        return types;
    }
    switch (symbol.kind) {
        case ts.SyntaxKind.ArrayType:
            const childrenTypes = getPropertyType(symbol['elementType'], typeChecker);
            if (childrenTypes.length === 1) types.push({ type: 'array', elementType: childrenTypes }); // , isParenthesizedType: childrenTypes[0].isParenthesizedType
            else types.push(...childrenTypes);

            return types;
        case ts.SyntaxKind.StringKeyword:
            types.push({ type: `string` });
            return types;
        case ts.SyntaxKind.NumberKeyword:
            types.push({ type: `number` });
            return types;
        case ts.SyntaxKind.BooleanKeyword:
            types.push({ type: `boolean` });
            return types;
        case ts.SyntaxKind.FunctionType:
            types.push({ type: `Function` });
            return types;
        case ts.SyntaxKind.TypeReference:
            const type: PropertyType = { type: getTypeReferenceNodeName(symbol) };
            if (type.type === 'Array' && symbol['typeArguments']) {
                const tempTypes: PropertyType[] = [];
                symbol['typeArguments'].map((n: ts.TypeNode) => tempTypes.push(...getPropertyType(n, typeChecker)));

                type.elementType = tempTypes;
            } else if (type.type === 'Array') {
                type.elementType = [{ type: `object` }];
            } else if (type.type === 'Set' && symbol['typeArguments']) {
                const tempTypes: PropertyType[] = [];
                symbol['typeArguments'].map((n: ts.TypeNode) => tempTypes.push(...getPropertyType(n, typeChecker)));

                type.elementType = tempTypes;
            } else if (type.type === 'Map' && symbol['typeArguments']) {
                const tempTypes: PropertyType[] = [];
                symbol['typeArguments'].map((n: ts.TypeNode) => tempTypes.push(...getPropertyType(n, typeChecker)));

                type.elementType = tempTypes;
            } else if (type.type === 'Symbol' && isSymbolInterface(symbol, typeChecker)) {
                type.type = 'symbol';
            } else {
                type.isEnumType = isEnumType(symbol, typeChecker as ts.TypeChecker);
            }

            types.push(type);
            return types;
        case ts.SyntaxKind.AnyKeyword:
            types.push({ type: `any` });
            return types;
        case ts.SyntaxKind.NullKeyword:
            types.push({ type: `null` });
            return types;
        case ts.SyntaxKind.ObjectKeyword:
            types.push({ type: `object` });
            return types;
        case ts.SyntaxKind.TypeLiteral:
            types.push({ type: `object` });
            return types;
        case ts.SyntaxKind.UnionType:
            symbol.types.map((token: any) => types.push(...getPropertyType(token, typeChecker)));
            return types;
        case ts.SyntaxKind.IntersectionType:
            symbol.types.map((token: any) => types.push(...getPropertyType(token, typeChecker)));
            return types;
        case ts.SyntaxKind.ParenthesizedType:
            types.push({ type: `parenthesized`, elementType: getPropertyType(symbol['type'], typeChecker), isParenthesizedType: true });
            return types;
        case ts.SyntaxKind.EnumMember:
            types.push({ type: symbol['initializer']['numericLiteralFlags'] !== undefined ? `number` : `string`, isEnumType: true });
            return types;
        case ts.SyntaxKind.UndefinedKeyword:
            types.push({ type: `undefined` });
            return types;
        case ts.SyntaxKind.BigIntKeyword:
            types.push({ type: `bigint` });
            return types;
        case ts.SyntaxKind.SymbolKeyword:
            types.push({ type: `symbol` });
            return types;
        default:
            types.push({ type: `unknown` });
            return types;
    }
}

function getModifierType (modifier: ts.Token<ts.SyntaxKind>): string {
    switch (modifier.kind) {
        case ts.SyntaxKind.ReadonlyKeyword:
            return 'readonly';
        default:
            return 'unknown';
    }
}

const indexTs = path.join(__dirname, './index.ts');
function isKeysCallExpression (node: ts.Node, typeChecker: ts.TypeChecker): node is ts.CallExpression {
    if (!ts.isCallExpression(node)) {
        return false;
    }
    const signature = typeChecker.getResolvedSignature(node);
    if (typeof signature === 'undefined') {
        return false;
    }
    const { declaration } = signature;
    return !!declaration
      && !ts.isJSDocSignature(declaration)
      && (path.join(declaration.getSourceFile().fileName) === indexTs)
      && !!declaration.name
      && declaration.name.getText() === 'keys';
};
