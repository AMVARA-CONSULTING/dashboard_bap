var fs = require('fs');

// Set config destiny file
var file = './src/assets/config_common.json';

// Read config file
fs.readFile(file, {
    // Read as UTF8
    encoding: 'utf-8'
}, function(err, data) {
    if (err) console.log(err);
    // Parse config as JSON
    var json = JSON.parse(data);
    // Split by dot to get version parts
    var versionParts = json.version.split('.');
    // Parse last part as number
    var patch = +versionParts[versionParts.length - 1];
    // Patch last number
    patch += 1;
    versionParts[versionParts.length - 1] = patch;
    // Rejoin version parts
    var fullVersion = versionParts.join('.');
    // Set changed version in global config
    json.version = fullVersion;
    // Save json config overriding original and preserving pretty format
    fs.writeFile(file, JSON.stringify(json, null, 4), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Patch version updated: ' + fullVersion);
        }
    })
})