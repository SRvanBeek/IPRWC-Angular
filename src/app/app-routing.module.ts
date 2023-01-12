import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {HomeComponent} from "./home/home.component";
import {ProductPageComponent} from "./products/product-page/product-page.component";
import {ProductListComponent} from "./products/product-list/product-list.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {AdminPortalComponent} from "./admin-portal/admin-portal.component";
import {AuthGuardService} from "./shared/_services/auth-guard.service";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent, children: [
      {path: ':type', component: ProductListComponent},
    ] },
  {path: 'products/:type/:id', component:  ProductPageComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'adminPortal', canActivate: [AuthGuardService] ,component: AdminPortalComponent},
  //final wildcard
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
