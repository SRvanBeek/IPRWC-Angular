import { Component } from '@angular/core';
import {AuthService} from "../../shared/_services/auth.service";

@Component({
  selector: 'app-offcanvas-header',
  templateUrl: './offcanvas-header.component.html',
  styleUrls: ['./offcanvas-header.component.scss']
})
export class OffcanvasHeaderComponent {

  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout()
  }
}
