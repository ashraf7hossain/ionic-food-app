import assert from 'assert';
import app from '../../src/app';

describe('\'sliders\' service', () => {
  it('registered the service', () => {
    const service = app.service('sliders');

    assert.ok(service, 'Registered the service');
  });
});
