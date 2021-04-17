/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const fetch = require('node-fetch');
require('../src/index');

describe('Test', () => {
  it('Hello world', async () => {
    const res = await fetch('http://localhost:9000');
    expect(await res.text()).to.contain('Hello');
  });
});
