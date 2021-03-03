import { Router } from 'express';

const router = Router();

router.get('/letters', (request, response) => {
  response.json({ message: 'Hello World' });
}); // Get one
/**
 router.get(); // Get all
 router.post(); // Insert new letter
 router.put(); // Update letter
 router.delete(); // Delete letter
*/

export default router;
