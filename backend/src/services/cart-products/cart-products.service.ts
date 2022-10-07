// Initializes the `cart-products` service on path `/cart-products`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CartProducts } from './cart-products.class';
import createModel from '../../models/cart-products.model';
import hooks from './cart-products.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'cart-products': CartProducts & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cart-products', new CartProducts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cart-products');

  service.hooks(hooks);
}
