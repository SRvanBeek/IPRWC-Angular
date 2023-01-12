import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../shared/_services/product.service";
import {Product} from "../../shared/_models/product.model";

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent {
  newProductForm: FormGroup;
  loading: boolean;
  imagePath: string;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.newProductForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  public get f() {
    return this.newProductForm.controls
  }

  addProduct() {
    let product: Product = new Product(
      null,
      this.f['name'].value,
      this.f['description'].value,
      this.f['image'].value,
      this.f['price'].value,
      this.f['type'].value
    )

    this.productService.addProduct(product)
      .subscribe({
        next: value => {
          console.log(value)
        }
      })
  }

  previewImage() {
    this.imagePath = this.f['image'].value
  }
}
