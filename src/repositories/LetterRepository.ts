/* eslint-disable prefer-promise-reject-errors */
import fs from 'fs';
import * as path from 'path';

interface Letter {
  id: number,
  from: string,
  to: string,
  title: string,
  description: string,
}

function getNewId(letters: Letter[]) {
  if (letters.length > 0) {
    return letters[letters.length - 1].id + 1;
  }

  return 1;
}

function getNewDate() {
  return new Date().toString();
}

function mustBeInArray(letters: Letter[], id) {
  return new Promise((resolve, reject) => {
    const findLetter = letters.find((letter) => letter.id === Number(id));
    if (!findLetter) {
      reject({
        message: 'Id is not correct or does not exist',
        status: 404,
      });
    }

    resolve(findLetter);
  });
}

function writeLettersFile(content) {
  const dataPath = path.resolve(__dirname, '..', 'data', 'letters.json');
  fs.writeFileSync(dataPath, JSON.stringify(content), 'utf8');
}

export {
  getNewId, getNewDate, mustBeInArray, writeLettersFile,
};
