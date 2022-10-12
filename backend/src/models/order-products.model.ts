// order-products-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'orderProducts';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    productID: { type: String, required: true },
    userID:{ type: String, required: true },
    orderID:{ type: String, required: true },
    imageURL: { type: String },
    name: { type: String, required: true },
    unitPrice : { type: Number, required: true },
    quantity: { type: Number, required: true },
    brand: { type: String, required: true },
    subtotal: { type: Number, required: true }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
