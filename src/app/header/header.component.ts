import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../shared/_services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }
}
