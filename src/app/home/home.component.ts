import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/_services/product.service";
import {Product} from "../shared/_models/product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  randomProducts: Product[] = [];

  constructor(private productService: ProductService) {

  }
  ngOnInit(): void {
    this.productService.getRandom(3)
      .subscribe(
        {
          next: value => {
            this.randomProducts = value.payload;
          }
        })
  }
}
