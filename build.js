const fs = require('node:fs/promises');
const path = require('node:path');
const { minify } = require('terser');

const root = __dirname;
const sourcePath = path.join(root, 'thenBy.js');
const modulePath = path.join(root, 'thenBy.module.js');
const minPath = path.join(root, 'thenBy.min.js');

const header = '/*** Copyright 2020 Teun Duynstee Licensed under the Apache License, Version 2.0 ***/\n';

async function buildModule(source) {
    const moduleCode = source.replace(/var firstBy = \(/, 'module.exports = (');
    await fs.writeFile(modulePath, moduleCode, 'utf8');
}

function wrapUmd(source) {
    return `(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else {
        root.firstBy = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
${source}
    return firstBy;
}));`;
}

async function buildMinified(source) {
    const wrapped = wrapUmd(source);
    const result = await minify(wrapped);

    if (!result.code) {
        throw new Error('Terser did not produce output');
    }

    await fs.writeFile(minPath, `${header}${result.code}\n`, 'utf8');
}

async function run() {
    const source = await fs.readFile(sourcePath, 'utf8');
    await Promise.all([buildModule(source), buildMinified(source)]);
}

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
