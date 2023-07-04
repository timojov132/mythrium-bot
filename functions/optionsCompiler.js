const fs = require('node:fs');

var position;

function optionsCompiler(jsonOptions) {
    var fileString = JSON.stringify(jsonOptions);
    console.log(fileString.indexOf("label"))
    for (var i = 0; i < jsonOptions.length; i++){
        position = fileString.indexOf('"label"')
        fileString = fileString.slice(0, position) + fileString.slice(position + 1, fileString.length)
        fileString = fileString.slice(0, position + 5) + fileString.slice(position + 6, fileString.length)
        position = fileString.indexOf('"description"')
        fileString = fileString.slice(0, position) + fileString.slice(position + 1, fileString.length)
        fileString = fileString.slice(0, position + 11) + fileString.slice(position + 12, fileString.length)
        position = fileString.indexOf('"value"')
        fileString = fileString.slice(0, position) + fileString.slice(position + 1, fileString.length)
        fileString = fileString.slice(0, position + 5) + fileString.slice(position + 6, fileString.length)
        console.log(fileString);
    }
    const noBrackets = fileString.slice(1,-1)
    return noBrackets;
}

module.exports = { optionsCompiler }