import {Component, Input} from '@angular/core';
import {ProductService} from "../../shared/_services/product.service";
import {Type} from "../../shared/_models/type.model";


@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent {
  @Input() editMode: boolean = false;
  types: Type[] = []

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.types = [];
    this.productService.getProductTypes()
      .subscribe({next: value => {
        this.types = value.payload;
          console.log(this.types)
        }})
  }
}
