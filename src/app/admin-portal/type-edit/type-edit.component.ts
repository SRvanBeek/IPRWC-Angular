import { Component } from '@angular/core';
import {Product} from "../../shared/_models/product.model";
import {fromEvent, Observable, Subscription} from "rxjs";
import {ProductService} from "../../shared/_services/product.service";
import {Type} from "../../shared/_models/type.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TypeModalComponent} from "../type-modal/type-modal.component";

@Component({
  selector: 'app-type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.scss']
})
export class TypeEditComponent {
  types: Type[]
  shortenValue: number;

  constructor(private productService: ProductService, private modal: NgbModal) {
  }

  ngOnInit() {
    this.refresh()
  }

  refresh() {
    this.types = [];
    this.productService.getProductTypes()
      .subscribe({
        next: value => {
          this.types = value.payload;
        }
      })
  }

  editType(type: Type) {
    const modal = this.modal.open(TypeModalComponent);
    modal.componentInstance.type = type;
    modal.componentInstance.finished
      .subscribe({
        next: value => {
          if (value === true) {
            this.refresh();
          }
        }
      })
  }
}
