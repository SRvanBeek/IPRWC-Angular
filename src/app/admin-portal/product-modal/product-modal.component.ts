import {Component, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../shared/_services/product.service";
import {Product} from "../../shared/_models/product.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import Validation from "../../shared/_validation/validation";
import {ToastService} from "../../shared/_services/toast.service";

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
  @Input() product: Product

  newProductForm: FormGroup;
  loading: boolean;
  imagePath: string;

  updateMode: boolean = false;
  public finished: EventEmitter<boolean>;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private toast: ToastService,
    ) {
    this.finished = new EventEmitter<boolean>
  }

  ngOnInit() {
    this.newProductForm = this.formBuilder.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', [Validators.required, Validation.validUrl]],
      price: ['', Validators.required, Validation.numberValidator]
    });

    if (this.product) {
      this.updateMode = true;
      this.initUpdateForm()
    }

  }

  initUpdateForm() {
      this.f['name'].setValue(this.product.name);
      this.f['description'].setValue(this.product.description);
      this.f['image'].setValue(this.product.imageUrl);
      this.f['price'].setValue(this.product.price);
      this.f['type'].setValue(this.product.type);
  }

  public get f() {
    return this.newProductForm.controls
  }

  saveProduct() {
    let product: Product = new Product(
      null,
      this.f['name'].value,
      this.f['description'].value,
      this.f['image'].value,
      this.f['price'].value,
      this.f['type'].value
    )

    if (!this.updateMode) {
      this.productService.addProduct(product)
        .subscribe({
          next: value => {
            if (value.code === 'ACCEPTED') {
              this.toast.show("New Product Added!", {classname: 'bg-success text-light', delay: 2000})
              this.modal.dismiss();
              this.finished.emit(true);
            } else {
              this.toast.show(value.message, {classname: 'bg-danger text-light', delay: 2000})
            }
          }
        })
    }
    else {
      product.id = this.product.id
      this.productService.updateProduct(product)
        .subscribe({
          next: value => {
            if (value.code === 'ACCEPTED') {
              this.toast.show("New Product Added!", {classname: 'bg-success text-light', delay: 2000})
              this.modal.dismiss();
              this.finished.emit(true);
            } else {
              this.toast.show(value.message, {classname: 'bg-danger text-light', delay: 2000})
            }
          }
        })
    }
  }

  previewImage() {
    let imageUrl;
    let imageForm = this.f['image']
    try {
      imageUrl = new URL(imageForm.value);
      this.imagePath = imageForm.value;
    } catch (_) {
      return false;
    }
  }
}
