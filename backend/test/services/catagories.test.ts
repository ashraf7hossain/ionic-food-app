import assert from 'assert';
import app from '../../src/app';

describe('\'catagories\' service', () => {
  it('registered the service', () => {
    const service = app.service('catagories');

    assert.ok(service, 'Registered the service');
  });
});
