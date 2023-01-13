import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../shared/_services/product.service";
import {Product} from "../../shared/_models/product.model";
import {fromEvent, Observable, Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductModalComponent} from "../product-modal/product-modal.component";
import {ProductImagesModalComponent} from "./product-images-modal/product-images-modal.component";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  products: Product[]
  shortenValue: number;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor(private productService: ProductService, private modal: NgbModal) {
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe()
  }

  ngOnInit() {
    this.shortenValue = window.innerWidth / 30

    this.refresh()

    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.shortenValue = window.innerWidth / 30
    })
  }

  refresh() {
    this.products = []
    this.productService.getAll()
      .subscribe({
        next: value => {
          this.products = value.payload;
        }
      })
  }

  editProduct(product: Product) {
    const modal = this.modal.open(ProductModalComponent);
    modal.componentInstance.product = product;
    modal.componentInstance.finished
      .subscribe({
        next: value => {
          if (value === true) {
            this.refresh();
          }
        }
      })
  }

  addImages(product: Product) {
    const modal = this.modal.open(ProductImagesModalComponent);
    modal.componentInstance.product = product;
  }
}
