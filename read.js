var fs = require("fs");

var file = './src/assets/config_common.json';

fs.readFile(file, {
    encoding: 'utf-8'
}, function(err, data) {
    if (err) console.log(err);
    var json = JSON.parse(data);
    var versionParts = json.version.split('.');
    var patch = +versionParts[versionParts.length - 1];
    patch += 1;
    versionParts[versionParts.length - 1] = patch;
    var fullVersion = versionParts.join('.');
    json.version = fullVersion;
    fs.writeFile(file, JSON.stringify(json, null, 4), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Patch version updated')
        }
    })
})