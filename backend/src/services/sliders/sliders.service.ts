// Initializes the `sliders` service on path `/sliders`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Sliders } from './sliders.class';
import createModel from '../../models/sliders.model';
import hooks from './sliders.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'sliders': Sliders & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sliders', new Sliders(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sliders');

  service.hooks(hooks);
}
