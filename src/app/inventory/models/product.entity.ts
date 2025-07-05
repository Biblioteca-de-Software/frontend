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

  static fromForm(formValue: any): Product {
    return new Product({
      productId: 0,
      name: formValue.name,
      expirationDate: formValue.expiration_date,
      quantity: formValue.stock,
      price: formValue.price
    });
  }
}
