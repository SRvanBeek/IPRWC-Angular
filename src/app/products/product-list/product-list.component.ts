import {Component, EventEmitter, Output} from '@angular/core';
import {Product} from "../../shared/_models/product.model";
import {ProductService} from "../../shared/_services/product.service";
import {ActivatedRoute, NavigationEnd, Params, Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Output() productWasSelected = new EventEmitter<Product>();
  type: string;

  products: Product[] = [
  ];

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    // router.events.subscribe((val) => {
    //   console.log(this.route.url)
    // });
  }

  ngOnInit(){
    this.route.params
      .subscribe((params: Params) => {
        this.type = params['type'];
        this.productService.getAllByType(this.type).subscribe({
          next: value =>{
            console.log(value.payload)
            this.products = value.payload;
          }
        });
      })


  }
}
