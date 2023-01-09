import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {ProductsModule} from "./products/products.module";
import {LoginModule} from "./login/login.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {JwtInterceptor} from "./shared/_helper/jwt.interceptor";
import { HomeComponent } from './home/home.component';
import { ProductPageComponent } from './products/product-page/product-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    LoginModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
