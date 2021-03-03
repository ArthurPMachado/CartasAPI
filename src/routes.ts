import { Router } from 'express';
import {
  createLetter, listOneLetter, listAllLetters, updateLetter, deleteLetter,
} from './controller/LetterController';
import { mustBeInteger, checkFields } from './service/LetterService';

const router = Router();
const baseURL = '/api/v1/letters';

router.get(`${baseURL}/:id`, mustBeInteger, async (request, response) => {
  const { id } = request.params;

  await listOneLetter(id)
    .then((letter) => response.json(letter))
    .catch((error) => {
      if (error.status) {
        response.status(error.status).json({ message: error.message });
      } else {
        response.status(500).json({ message: error.message });
      }
    });
});

router.get(`${baseURL}`, async (request, response) => {
  await listAllLetters()
    .then((letters) => response.json(letters))
    .catch((error) => {
      if (error.status) {
        response.status(error.status).json({ message: error.message });
      } else {
        response.status(500).json({ message: error.message });
      }
    });
});

router.post(`${baseURL}`, checkFields, async (request, response) => {
  await createLetter(request.body)
    .then((letter) => response.status(201).json({
      message: 'Your letter was created successfully!',
      content: letter,
    }))
    .catch((error) => {
      response.status(500).json({ message: error.message });
    });
});

router.put(`${baseURL}/:id`, mustBeInteger, checkFields, async (request, response) => {
  const { id } = request.params;

  await updateLetter(id, request.body)
    .then((letter) => response.json({
      message: 'Your letter was updated successfully!',
      content: letter,
    }))
    .catch((error) => {
      if (error.status) {
        response.status(error.status).json({ message: error.message });
      } else {
        response.status(500).json({ message: error.message });
      }
    });
});

router.delete(`${baseURL}/:id`, mustBeInteger, async (request, response) => {
  const { id } = request.params;

  await deleteLetter(id)
    .then(() => response.json({
      message: 'Your letter was deleted successfully!',
    }))
    .catch((error) => {
      if (error.status) {
        response.status(error.status).json({ message: error.message });
      } else {
        response.status(500).json({ message: error.message });
      }
    });
});

export default router;
