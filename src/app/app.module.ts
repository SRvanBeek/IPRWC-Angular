import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {ProductsModule} from "./products/products.module";
import {LoginModule} from "./shared/_modals/login/login.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {JwtInterceptor} from "./shared/_helper/jwt.interceptor";
import { HomeComponent } from './home/home.component';
import { ProductPageComponent } from './products/product-page/product-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {HeaderModule} from "./header/header.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import {HomeModule} from "./home/home.module";
import {AdminPortalModule} from "./admin-portal/admin-portal.module";
import {ShoppingCartModule} from "./shopping-cart/shopping-cart.module";
import {ToastsContainer} from "./shared/ngb/toast-container.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,

        SharedModule,
        HeaderModule,
        ProductsModule,
        LoginModule,
        HomeModule,
        AdminPortalModule,
        ShoppingCartModule,
        ToastsContainer
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
