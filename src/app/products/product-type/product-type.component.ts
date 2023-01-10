import { Component } from '@angular/core';
import {ProductService} from "../../shared/_services/product.service";

class Type {
  constructor(public imageUrl: string,
              public name: string) {
  }
}

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent {
  types: Type[] = [
    new Type('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-gaming-desktops-1610126113.jpg', 'DESKTOP'),
    new Type('https://image.coolblue.nl/transparent/max/422x390/content/1ffb23ee41bd5518b2571845cb7677a9', 'LAPTOP'),
    new Type('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-gaming-desktops-1610126113.jpg', 'DESKTOP'),
    new Type('https://image.coolblue.nl/transparent/max/422x390/content/1ffb23ee41bd5518b2571845cb7677a9', 'LAPTOP'),
    new Type('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-gaming-desktops-1610126113.jpg', 'DESKTOP'),
    new Type('https://image.coolblue.nl/transparent/max/422x390/content/1ffb23ee41bd5518b2571845cb7677a9', 'LAPTOP')
  ]

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
