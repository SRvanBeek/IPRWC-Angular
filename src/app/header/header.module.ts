import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header.component";
import {OffcanvasHeaderComponent} from "./offcanvas-header/offcanvas-header.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {LoginModule} from "../shared/_modals/login/login.module";
import {NgbActiveOffcanvas, NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    HeaderComponent,
    OffcanvasHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LoginModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    NgbActiveOffcanvas,
    NgbOffcanvas
  ]
})
export class HeaderModule { }
