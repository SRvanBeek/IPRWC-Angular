import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProductsComponent} from "./products/products.component";
import {HomeComponent} from "./home/home.component";
import {ProductDetailComponent} from "./products/product-detail/product-detail.component";
import {ProductPageComponent} from "./products/product-page/product-page.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'productview/:id', component: ProductPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
