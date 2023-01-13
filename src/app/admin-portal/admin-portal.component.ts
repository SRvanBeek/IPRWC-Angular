import { Component } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductModalComponent} from "./product-modal/product-modal.component";
import {TypeModalComponent} from "./type-modal/type-modal.component";
import {AuthService} from "../shared/_services/auth.service";

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.scss']
})
export class AdminPortalComponent {
  constructor(private modalService: NgbModal, public authService: AuthService) {
  }

  openAddProductModal() {
    this.modalService.open(ProductModalComponent);
  }

  openAddTypeModal() {
    this.modalService.open(TypeModalComponent)
  }

  editProducts() {

  }

  editTypes() {

  }
}
