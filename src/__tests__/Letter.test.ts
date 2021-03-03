/* eslint-disable no-undef */
import request from 'supertest';
import server from '../app';

describe('Letters', () => {
  const baseURL = '/api/v1/letters';

  it('Should be able to create a new letter', async () => {
    const response = await request(server).post(baseURL).send({
      from: 'Roberto Souza',
      to: 'Papai Noel',
      title: 'Oi Noel',
      description: 'Quero receber um brinquedo muito legal',
    });

    expect(response.status).toBe(201);
  });

  it('Should be able to retrieve all letters', async () => {
    const response = await request(server).get(baseURL);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('Should be able to retrieve a single letter', async () => {
    const response = await request(server).get(`${baseURL}/1`);

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(1);
  });
});
