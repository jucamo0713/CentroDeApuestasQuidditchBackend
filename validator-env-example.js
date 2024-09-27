"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.time('Search Finished IN');
var node_fs_1 = require("node:fs");
var path_1 = require("path");
var env_schema_1 = require("./src/applications/env.schema");
var excludedDirs = new Set(['.git', 'node_modules', 'dist', '.idea', '.husky']);
var listDefaultsKeys = new Set(['PWD']);
var keysNotInExample = new Set();
var exampleFile = (0, node_fs_1.readFileSync)('.env.example').toString();
var exampleKeys = new Set(exampleFile
    .split('\n')
    .filter(function (line) { return line && !line.startsWith('#'); })
    .map(function (line) { return line.split('=')[0]; }));
var schemaKeys = new Set(env_schema_1.EnvSchema.$_terms.keys.map(function (term) { return term.key; }));
var keysNotInSchema = new Set();
var allUsedKeys = new Set();
function searchDirectory(directoryPath) {
    var files = (0, node_fs_1.readdirSync)(directoryPath);
    files.forEach(function (file) {
        var filePath = (0, path_1.join)(directoryPath, file);
        var stats = (0, node_fs_1.statSync)(filePath);
        if (stats.isDirectory() && !excludedDirs.has(file)) {
            searchDirectory(filePath);
        }
        else if (stats.isFile() && file.endsWith('.ts')) {
            var data = (0, node_fs_1.readFileSync)(filePath).toString();
            var matches = data.match(new RegExp(/process\.env\.\w+/, 'g'));
            if (matches) {
                matches.forEach(function (match) {
                    var key = match.split('process.env.').pop().trim();
                    allUsedKeys.add(key);
                    if (!listDefaultsKeys.has(key)) {
                        if (!exampleKeys.has(key)) {
                            keysNotInExample.add(key);
                        }
                        if (!schemaKeys.has(key)) {
                            keysNotInSchema.add(key);
                        }
                    }
                });
            }
        }
        else if (stats.isFile() && file.endsWith('.yml')) {
            var data = (0, node_fs_1.readFileSync)(filePath).toString();
            var matches = data.match(new RegExp(/\$\{\s*\w+\s*(-\s*\w+\s*)?}/, 'g'));
            if (matches) {
                matches.forEach(function (match) {
                    var key = match.match(/\w+/).pop().trim();
                    allUsedKeys.add(key);
                    if (!listDefaultsKeys.has(key)) {
                        if (!exampleKeys.has(key)) {
                            keysNotInExample.add(key);
                        }
                    }
                });
            }
        }
    });
}
var directoryToSearch = '.';
searchDirectory(directoryToSearch);
var error = '';
if (keysNotInExample.size > 0) {
    error += "Keys not in example keys: \n".concat(Array.from(keysNotInExample).join('\n'));
}
if (keysNotInSchema.size > 0) {
    error += "".concat(error ? '\n\n' : '', "Keys not in joy schema keys: \n").concat(Array.from(keysNotInSchema).join('\n'));
}
var exampleNotUsed = Array.from(exampleKeys).filter(function (exKey) { return !allUsedKeys.has(exKey); });
if (exampleNotUsed.length > 0) {
    error += "".concat(error ? '\n\n' : '', "Keys not used in example: \n").concat(exampleNotUsed.join('\n'));
}
var schemaNotUsed = Array.from(schemaKeys).filter(function (schKey) { return !allUsedKeys.has(schKey); });
if (schemaNotUsed.length > 0) {
    error += "".concat(error ? '\n\n' : '', "Keys not used in schema: \n").concat(schemaNotUsed.join('\n'));
}
if (error) {
    console.timeEnd('Search Finished IN');
    throw new Error(error);
}
console.timeEnd('Search Finished IN');
