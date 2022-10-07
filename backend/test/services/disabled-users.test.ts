import assert from 'assert';
import app from '../../src/app';

describe('\'disabled-users\' service', () => {
  it('registered the service', () => {
    const service = app.service('disabled-users');

    assert.ok(service, 'Registered the service');
  });
});
