export class Product {
  productId: number;
  name: string;
  expirationDate: string;
  quantity: number;
  price: number;

  constructor(data: {
    productId: number,
    name: string,
    expirationDate: string,
    quantity: number,
    price: number
  }) {
    this.productId = data.productId;
    this.name = data.name;
    this.expirationDate = data.expirationDate;
    this.quantity = data.quantity;
    this.price = data.price;
  }
}
