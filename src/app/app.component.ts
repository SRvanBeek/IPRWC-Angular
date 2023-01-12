import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./shared/_services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Course-Project';

  loading: boolean = true;

  constructor(public router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    if(!this.authService.autoLogout(false)) {
      this.loading = false
    }
    this.loading = false;
  }


}
