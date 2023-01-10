import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../shared/_models/product.model";
import {ProductService} from "../../../shared/_services/product.service";


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: Product;

  constructor(private productsService: ProductService) {
  }

  onSelected() {
    this.productsService.productSelected.emit(this.product);
  }
}
