/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const breed = {
  id: "d7a8ea01-fcee-4e8a-9f5d-6d64072f0fc5",
  name: 'Pug',
  weight: "10 - 15",
  height: "30 - 40",
  years: "7 - 14"
}

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  // beforeEach(() => Dog.sync({ force: true })
  //   .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});
