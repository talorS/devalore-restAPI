const jFile = require('jsonfile');

exports.writeDataToFile = function (filePath, data) {
    return new Promise((resolve, reject) => {
        jFile.writeFile(filePath, data, { spaces: 2, encoding: "utf8" }, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Succeeded');
            }
        });
    });
}
