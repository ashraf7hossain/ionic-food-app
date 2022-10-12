// Initializes the `catagories` service on path `/catagories`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Catagories } from './catagories.class';
import createModel from '../../models/catagories.model';
import hooks from './catagories.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'catagories': Catagories & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/catagories', new Catagories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('catagories');

  service.hooks(hooks);
}
