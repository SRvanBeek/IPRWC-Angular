import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductsEditComponent} from "./products-edit/products-edit.component";
import {TypeEditComponent} from "./type-edit/type-edit.component";

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss']
})
export class AdminPortalComponent {
  constructor(private modalService: NgbModal) {
  }

  openAddProductModal() {
    this.modalService.open(ProductsEditComponent);
  }

  openAddTypeModal() {
    this.modalService.open(TypeEditComponent)
  }
}
