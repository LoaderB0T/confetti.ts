import { randomStub, resetRandomStub } from '../random-stub.js';

describe('', () => {
  let originalRandom: typeof Math.random;
  beforeEach(() => {
    originalRandom = Math.random;
    resetRandomStub();
    Math.random = () => randomStub();
  });
  afterEach(() => {
    Math.random = originalRandom;
  });

  test('random mock works', async () => {
    expect(Math.random()).toBe(0.908788990863389);
    expect(Math.random()).toBe(0.7982002517390028);
    expect(Math.random()).toBe(0.4753399903420179);
    expect(Math.random()).toBe(0.00016161331579800375);
  });
});
