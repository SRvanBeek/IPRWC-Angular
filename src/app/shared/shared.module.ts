import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {BackButtonDirective} from "./_directives/backButton.directive";
import {ShortenPipe} from "./_pipes/shorten.pipe";

@NgModule({
  declarations: [
    BackButtonDirective,
    ShortenPipe
  ],
  exports: [
    BackButtonDirective,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class SharedModule { }
