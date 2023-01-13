import {Component, Input} from '@angular/core';
import {Product} from "../../../shared/_models/product.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Validation from "../../../shared/_validation/validation";
import {ExtraImage} from "../../../shared/_models/extraImage.model";
import {ProductService} from "../../../shared/_services/product.service";
import {ToastService} from "../../../shared/_services/toast.service";

@Component({
  selector: 'app-product-images-modal',
  templateUrl: './product-images-modal.component.html',
  styleUrls: ['./product-images-modal.component.scss']
})
export class ProductImagesModalComponent {
  @Input() product: Product;
  extraImages: ExtraImage[];
  extraImageForm: FormGroup;
  public isCollapsed = false;


  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toast: ToastService
  ) {
  }

  ngOnInit() {
    this.refresh()
    this.InitForm()
  }
  refresh() {
    this.productService.getExtraImages(this.product.id)
      .subscribe({
        next: value => {
          this.extraImages = value.payload;
        }
      })
  }

  InitForm() {
    this.extraImageForm = this.formBuilder.group({
      image: ['', [Validators.required, Validation.validUrl]]
    });
  }

  public get f() {
    return this.extraImageForm.controls
  }

  deleteImages() {
    this.productService.deleteImagesPerProduct(this.product)
      .subscribe({
        next: value => {
          if (value.code === 'ACCEPTED') {
            this.toast.show("Extras Cleared", {classname: 'bg-warning text-light', delay: 2000})
            this.refresh()
          }
        }
      })
  }

  addImage() {
    let extraImage: ExtraImage = new ExtraImage(
      null,
      this.product,
      this.f['image'].value
    )

    this.productService.postExtraImage(extraImage)
      .subscribe({
        next: value => {
          if (value.code === 'ACCEPTED') {
            this.toast.show("Extra Image Added!", {classname: 'bg-success text-light', delay: 2000})
            this.refresh()
          }
        }
      })
  }
}
