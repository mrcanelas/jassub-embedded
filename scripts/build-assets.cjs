const fs = require('fs');
const path = require('path');

const workerPath = path.join(__dirname, '../src/wasm/jassub-worker.js');
const wasmPath = path.join(__dirname, '../src/wasm/jassub-worker.wasm');
const wasmModernPath = path.join(__dirname, '../src/wasm/jassub-worker-modern.wasm');
const fontPath = path.join(__dirname, '../src/default.woff2');
const fontBinary = fs.readFileSync(fontPath).toString('base64');

const workerSource = fs.readFileSync(workerPath, 'utf8');
const wasmBinary = fs.readFileSync(wasmPath).toString('base64');
const wasmModernBinary = fs.readFileSync(wasmModernPath).toString('base64');


const template = `/* Generated from jassub. Do not edit manually. */
module.exports = {
    version: "${require('../package.json').version}",
    workerSource: ${JSON.stringify(workerSource)},
    wasmBinary: "${wasmBinary}",
    wasmModernBinary: "${wasmModernBinary}",
    defaultFont: "data:font/woff2;base64,${fontBinary}"
};`;

fs.writeFileSync(path.join(__dirname, '../vendor/jassubAssets.cjs'), template);