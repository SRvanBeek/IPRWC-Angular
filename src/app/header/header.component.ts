import {Component} from '@angular/core';
import {AuthService} from "../shared/_services/auth.service";
import {NgbModal, NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {OffcanvasHeaderComponent} from "./offcanvas-header/offcanvas-header.component";
import {LoginComponent} from "../shared/_modals/login/login.component";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private offCanvas: NgbOffcanvas) {
  }

  logout() {
    this.authService.logout();
  }



  openOffCanvas() {
    this.offCanvas.open(OffcanvasHeaderComponent, {position: 'end'})
  }
}
