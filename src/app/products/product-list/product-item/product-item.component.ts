import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../shared/_models/product.model";
import {ProductService} from "../../../shared/_services/product.service";
import {fromEvent, Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: Product;
  mobile: boolean;

  mobileWidth: number = 520;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;


  constructor(private productsService: ProductService) {
  }

  ngOnInit() {
    if (window.innerWidth <= this.mobileWidth) {
      this.mobile = true;
    }
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      if (!this.mobile && (window.innerWidth <= this.mobileWidth)) {
        this.mobile = true
      }
      else if (this.mobile && (window.innerWidth > this.mobileWidth)) {
        this.mobile = false
      }
    })
  }

  onSelected() {
    this.productsService.productSelected.emit(this.product);
  }
}
