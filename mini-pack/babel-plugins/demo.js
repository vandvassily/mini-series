// import * as t from '@babel/types';
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

const code = `function square(n) {
  return n * n;
}`;

const ast = parse(code);

const res = transformFromAst(ast, '').code;

console.log(res);
