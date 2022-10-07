// Initializes the `order-products` service on path `/order-products`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { OrderProducts } from './order-products.class';
import createModel from '../../models/order-products.model';
import hooks from './order-products.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'order-products': OrderProducts & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/order-products', new OrderProducts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('order-products');

  service.hooks(hooks);
}
