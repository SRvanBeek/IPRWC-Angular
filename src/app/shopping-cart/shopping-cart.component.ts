import { Component } from '@angular/core';
import {NgbActiveOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {Product} from "../shared/_models/product.model";
import {ProductService} from "../shared/_services/product.service";
import {AuthService} from "../shared/_services/auth.service";
import {OrderService} from "../shared/_services/order.service";
import {ToastService} from "../shared/_services/toast.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  public products: Product[] = [];
  cost: number = 0;

  constructor(public offcanvasService: NgbActiveOffcanvas,
              private productService: ProductService,
              private authService: AuthService,
              private orderService: OrderService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.initCart()
  }

  initCart() {
    let productIds: number[] = []
    this.products = [];
    this.cost = 0;
    if (localStorage.getItem('cart')) {
      productIds = JSON.parse(localStorage.getItem('cart'));
      for (let i = 0; i < productIds.length; i++) {
        {
          this.productService.getOne(productIds.at(i))
            .subscribe({
              next: value => {
                let product: Product = value.payload;
                this.products.push(value.payload);
                this.cost += product.price;

              }
            })
        }
      }
    }
  }

  clearCart(showToast: boolean) {
    localStorage.setItem('cart', '')
    this.initCart();
    if (showToast) {
      this.toastService.show("cart cleared", {classname: 'bg-danger text-light', delay: 2000});
    }
  }

  placeOrder() {
    if (this.authService.loggedIn()) {
      if (localStorage.getItem('cart')) {
        let productIds: number[] = JSON.parse(localStorage.getItem('cart'))
        this.orderService.placeOrder(this.authService.getUserId(), this.cost, productIds)
          .subscribe({
            next: value => {
              console.log(value)
              if (value.code === 'ACCEPTED') {
                this.clearCart(false)
                this.toastService.show( "order placed! (Order #" + value.payload.id + ")", { classname: 'bg-primary text-light', delay: 5000 })
              }
            }
          })
      }
    }
  }
}
