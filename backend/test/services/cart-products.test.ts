import assert from 'assert';
import app from '../../src/app';

describe('\'cart-products\' service', () => {
  it('registered the service', () => {
    const service = app.service('cart-products');

    assert.ok(service, 'Registered the service');
  });
});
