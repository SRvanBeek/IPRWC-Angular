import { Component } from '@angular/core';
import {NgbActiveOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "../shared/_models/product.model";
import {ProductService} from "../shared/_services/product.service";
import {AuthService} from "../shared/_services/auth.service";
import {OrderService} from "../shared/_services/order.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  public products: Product[] = [];
  totalPrice: number = 0;

  constructor(public offcanvasService: NgbActiveOffcanvas,
              private productService: ProductService,
              private authService: AuthService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.initCart()
  }

  initCart() {
    let productIds: number[] = []
    this.products = [];
    this.totalPrice = 0;
    if (localStorage.getItem('cart')) {
      productIds = JSON.parse(localStorage.getItem('cart'));
      for (let i = 0; i < productIds.length; i++) {
        {
          this.productService.getOne(productIds.at(i))
            .subscribe({
              next: value => {
                let product: Product = value.payload;
                this.products.push(value.payload);
                this.totalPrice += product.price;

              }
            })
        }
      }
    }
  }

  clearCart() {
    localStorage.setItem('cart', '')
    this.initCart()
  }

  placeOrder() {
    let cart: number[];
    console.log("order")
    if (this.authService.loggedIn()) {
      console.log("order")
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
        let productIds: number[]

        this.orderService.placeOrder(this.authService.getUserId(), productIds)
          .subscribe({
            next: value => {
              console.log(value)
            }
          })
      }
    }
  }
}
