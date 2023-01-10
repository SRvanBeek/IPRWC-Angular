import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/_models/product.model";
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../shared/_services/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @Input() product: Product;

}
