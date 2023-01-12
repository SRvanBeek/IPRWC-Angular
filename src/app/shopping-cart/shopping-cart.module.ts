import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShoppingCartComponent} from "./shopping-cart.component";
import {ToastsContainer} from "../shared/ngb/toast-container.component";



@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
    imports: [
        CommonModule,
        ToastsContainer
    ]
})
export class ShoppingCartModule { }
