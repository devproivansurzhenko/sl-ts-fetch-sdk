'use strict';

const fs = require('fs');

const rawdata = fs.readFileSync('sample.json');
const swagger_json = JSON.parse(rawdata);

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

Object.keys(swagger_json.paths).map(function(key, index) {

    const path = swagger_json.paths[key]

    Object.keys(path).map(function(key2, index2) {
        const operation = path[key2];

        if (!operation.operationId) {
            operation.operationId = operation.summary.split(' ').map((s) => s.capitalize()).join('')
            console.log(operation.operationId)
        }

        return operation
    });

    return path
});

let data = JSON.stringify(swagger_json);
fs.writeFileSync('sample-processed.json', data);
