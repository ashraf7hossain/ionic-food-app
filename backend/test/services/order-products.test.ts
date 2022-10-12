import assert from 'assert';
import app from '../../src/app';

describe('\'order-products\' service', () => {
  it('registered the service', () => {
    const service = app.service('order-products');

    assert.ok(service, 'Registered the service');
  });
});
