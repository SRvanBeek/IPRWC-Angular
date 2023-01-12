import { Component } from '@angular/core';
import {AuthService} from "../../shared/_services/auth.service";
import {LoginComponent} from "../../shared/_modals/login/login.component";
import {NgbModal, NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {ShoppingCartComponent} from "../../shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-offcanvas-header',
  templateUrl: './offcanvas-header.component.html',
  styleUrls: ['./offcanvas-header.component.scss']
})
export class OffcanvasHeaderComponent {
  loggedIn: boolean;
  admin: boolean;

  ngOnInit() {
    this.loggedIn = this.authService.loggedIn();
    this.setAdmin()
  }

  constructor(private authService: AuthService, public modalService: NgbModal, public offcanvasService: NgbOffcanvas) {
  }

  logout() {
    this.offcanvasService.dismiss()
    this.authService.logout()
  }

  openLogin() {
    this.offcanvasService.dismiss()
    this.modalService.open(LoginComponent)
  }

  setAdmin() {
    this.authService.isAdmin()
      .then((admin: boolean) => {
        this.admin = admin;
      })
  }

  openCart() {
    this.offcanvasService.dismiss();
    setTimeout(() => {
      this.offcanvasService.open(ShoppingCartComponent, {position: 'end'})
    } ,400)
  }
}
