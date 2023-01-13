import {Product} from "./product.model";

export class ExtraImage {
  constructor(
    public id: number,
    public product: Product,
    public image_url: string) {

  }
}
