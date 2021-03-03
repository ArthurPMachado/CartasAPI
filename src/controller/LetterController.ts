/* eslint-disable eqeqeq */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-dynamic-require */
import {
  getNewId, getNewDate, mustBeInArray, writeLettersFile,
} from '../repositories/LetterRepository';

let letters = require('../data/letters.json');

interface Letter {
  id: number,
  from: string,
  to: string,
  title: string,
  description: string,
  created_at: Date
}

function createLetter(newLetter) {
  return new Promise((resolve, reject) => {
    const id = { id: getNewId(letters) };
    const date = {
      created_at: getNewDate(),
      updated_at: getNewDate(),
    };
    newLetter = { ...id, ...date, ...newLetter };
    letters.push(newLetter);
    writeLettersFile(letters);
    resolve(newLetter);
  });
}

function listOneLetter(id) {
  return new Promise((resolve, reject) => {
    mustBeInArray(letters, id)
      .then((letter) => resolve(letter))
      .catch((error) => reject(error));
  });
}

function listAllLetters() {
  return new Promise((resolve, reject) => {
    if (letters.length === 0) {
      reject({
        message: 'No letters registered',
        status: '202',
      });
    }

    resolve(letters);
  });
}

function updateLetter(id, registeredLetter) {
  return new Promise((resolve, reject) => {
    mustBeInArray(letters, id)
      .then((letter: Letter) => {
        const index = letters.findIndex((item) => item.id === letter.id);
        id = { id: letter.id };
        const date = {
          created_at: letter.created_at,
          updated_at: getNewDate(),
        };
        letters[index] = { ...id, ...date, ...registeredLetter };
        writeLettersFile(letters);
        resolve(letters[index]);
      })
      .catch((error) => reject(error));
  });
}

function deleteLetter(id) {
  return new Promise((resolve, reject) => {
    mustBeInArray(letters, id)
      .then(() => {
        letters = letters.filter((item) => item.id !== Number(id));
        writeLettersFile(letters);
        resolve(undefined);
      })
      .catch((error) => reject(error));
  });
}

export {
  createLetter, listOneLetter, listAllLetters, updateLetter, deleteLetter,
};
