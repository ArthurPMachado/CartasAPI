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

  it('Should be able to update a letter', async () => {
    const getLetter = await request(server).get(`${baseURL}/1`);

    const response = await request(server).put(`${baseURL}/1`).send({
      from: getLetter.body.from,
      to: getLetter.body.to,
      title: 'Oi papai noel, tudo bem',
      description: 'Quero receber um jogo novo pra me divertir nas férias da escola',
    });

    expect(response.status).toBe(200);
    expect(response.body.title).not.toEqual(getLetter.body.title);
    expect(response.body.description).not.toEqual(getLetter.body.description);
  });

  it('Should be able to delete a letter', async () => {
    const response = await request(server).delete(`${baseURL}/1`);

    const getLetter = await request(server).get(`${baseURL}/1`);

    expect(response.status).toBe(200);
    expect(getLetter.status).toBe(404);
  });
});
