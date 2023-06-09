"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var csv = require("csv-parser");
function readCsvData(filePath) {
    var data = [];
    return new Promise(function (resolve, reject) {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', function (row) {
            var firstName = row["First Name"], Surname = row.Surname, RegNum = row["Registration Number"];
            data.push({ firstName: firstName, Surname: Surname, RegNum: RegNum });
        })
            .on('end', function () {
            resolve(data);
        })
            .on('error', function (error) {
            reject(error);
        });
    });
}
// Provide the path to your CSV file
var filePath = '/Users/sudhanshutiwari/Desktop/Script/All_Entry .csv';
// Read the CSV data
readCsvData(filePath)
    .then(function (data) {
    console.log(data);
})
    .catch(function (error) {
    console.error(error);
});
