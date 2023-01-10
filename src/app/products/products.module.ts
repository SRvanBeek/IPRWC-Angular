import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductItemComponent} from "./product-list/product-item/product-item.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ProductsComponent} from "./products.component";
import {SharedModule} from "../shared/shared.module";
import {RouterLink, RouterOutlet} from "@angular/router";
import { ProductTypeComponent } from './product-type/product-type.component';



@NgModule({
    declarations: [
        ProductListComponent,
        ProductItemComponent,
        ProductDetailComponent,
        ProductsComponent,
        ProductTypeComponent
    ],
    exports: [
        ProductDetailComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterLink,
        RouterOutlet
    ]
})
export class ProductsModule { }
