import * as fs from 'fs';
import * as csv from 'csv-parser';

function readCsvData(filePath: string): Promise<any[]> {
  const data: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const { 'First Name':firstName ,Surname,'Registration Number':RegNum } = row;
        data.push({ firstName, Surname, RegNum });
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Provide the path to your CSV file
const filePath = '/Users/sudhanshutiwari/Desktop/Script/All_Entry .csv';

// Read the CSV data
readCsvData(filePath)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
