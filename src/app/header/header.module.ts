import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header.component";
import {OffcanvasHeaderComponent} from "./offcanvas-header/offcanvas-header.component";
import {RouterLink, RouterLinkActive} from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent,
    OffcanvasHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
