/* eslint-disable prefer-promise-reject-errors */
import fs from 'fs';

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
  new Date().toString();
}

function mustBeInArray(letters: Letter[], id) {
  return new Promise((resolve, reject) => {
    const findLetter = letters.find((letter) => letter.id === id);
    if (!findLetter) {
      reject({
        message: 'Id is not correct',
        status: 404,
      });
    }

    resolve(findLetter);
  });
}

function writeLettersFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8');
}

export {
  getNewId, getNewDate, mustBeInArray, writeLettersFile,
};
