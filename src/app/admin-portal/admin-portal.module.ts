import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminPortalComponent} from "./admin-portal.component";
import {RouterLink} from "@angular/router";
import { TypeEditComponent } from './type-edit/type-edit.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AdminPortalComponent,
    TypeEditComponent,
    ProductsEditComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ]
})
export class AdminPortalModule { }
