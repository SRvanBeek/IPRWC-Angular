import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminPortalComponent} from "./admin-portal.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import { TypeModalComponent } from './type-modal/type-modal.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProductEditComponent } from './product-edit/product-edit.component';
import { TypeEditComponent } from './type-edit/type-edit.component';
import {SharedModule} from "../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import { ProductImagesModalComponent } from './product-edit/product-images-modal/product-images-modal.component';
import {ToastsContainer} from "../shared/ngb/toast-container.component";



@NgModule({
  declarations: [
    AdminPortalComponent,
    TypeModalComponent,
    ProductModalComponent,
    ProductEditComponent,
    TypeEditComponent,
    ProductImagesModalComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    RouterOutlet,
    SharedModule,
    MatIconModule,
    ToastsContainer
  ]
})
export class AdminPortalModule { }
