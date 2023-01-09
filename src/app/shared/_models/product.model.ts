export class Product {
  public id: number;
  public name: string;
  public description: string;
  public imageUrl: string;
  public price: number;
  public type: string;

  constructor(id: number, name: string, description: string, image_url: string, price: number, type: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = image_url;
    this.price = price;
    this.type = type;
  }
}
