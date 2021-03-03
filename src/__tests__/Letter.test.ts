/* eslint-disable no-undef */
import request from 'supertest';
import server from '../app';

describe('Letters', () => {
  it('Should be able to create a new letter', async () => {
    const response = await request(server).post('/api/v1/letters').send({
      from: 'Roberto Souza',
      to: 'Papai Noel',
      title: 'Oi Noel',
      description: 'Quero receber um brinquedo muito legal',
    });

    expect(response.status).toBe(201);
  });
});
