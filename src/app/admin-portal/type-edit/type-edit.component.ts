import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../shared/_services/product.service";
import {Product} from "../../shared/_models/product.model";
import {Type} from "../../shared/_models/type.model";

@Component({
  selector: 'app-type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.scss']
})
export class TypeEditComponent {
  newTypeForm: FormGroup;
  loading: boolean;
  imagePath: string;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.newTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  public get f() {
    return this.newTypeForm.controls
  }

  addType() {
    let type: Type = new Type(
      this.f['image'].value,
      this.f['name'].value
    )

    this.productService.addProductType(type)
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
