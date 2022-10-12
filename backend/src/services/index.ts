import { Application } from '../declarations';
import users from './users/users.service';
import cartProducts from './cart-products/cart-products.service';
import orders from './orders/orders.service';
import catagories from './catagories/catagories.service';
import orderProducts from './order-products/order-products.service';
import products from './products/products.service';
import customers from './customers/customers.service';
import sliders from './sliders/sliders.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(cartProducts);
  app.configure(orders);
  app.configure(catagories);
  app.configure(orderProducts);
  app.configure(products);
  app.configure(customers);
  app.configure(sliders);
}
