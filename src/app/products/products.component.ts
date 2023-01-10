import {Component, OnInit} from '@angular/core';
import {Product} from "../shared/_models/product.model";
import {ProductService} from "../shared/_services/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  selectedProduct: Product;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productService.productSelected
      .subscribe(
        (product: Product) => {
          this.router.navigate([product.type +'/'+product.id], {relativeTo: this.route});
        }
      )
  }

  ngDoCheck() {
  }
}
