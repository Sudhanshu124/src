import * as fs from 'fs';
import * as csv from 'csv-parser';
import axios from 'axios';

function fetchData(firstName: string, surname: string, regNum: string): Promise<any> {
  const apiUrl = 'API_ENDPOINT';
  const params = {
    firstName: firstName,
    surname: surname,
    regNum: regNum
  };

  return axios.get(apiUrl, { params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

function readCsvData(filePath: string): Promise<any[]> {
  const data: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const { 'First Name': firstName, Surname, 'Registration Number': regNum } = row;
        data.push({ firstName, Surname, regNum });
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}


const filePath = '/Users/sudhanshutiwari/Desktop/Script/All_Entry .csv'; //Add your own file path

// Read the CSV data
readCsvData(filePath)
  .then((data) => {
    const promises = data.map((entry) => {
      const { firstName, Surname, regNum } = entry;
      return fetchData(firstName, Surname, regNum);
    });

    Promise.all(promises)
      .then((responses) => {
        console.log(responses);
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
  });
