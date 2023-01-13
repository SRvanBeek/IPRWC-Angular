import {Component, EventEmitter, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../shared/_services/product.service";
import {Product} from "../../shared/_models/product.model";
import {Type} from "../../shared/_models/type.model";
import Validation from "../../shared/_validation/validation";
import {ToastService} from "../../shared/_services/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-type-modal',
  templateUrl: './type-modal.component.html',
  styleUrls: ['./type-modal.component.scss']
})
export class TypeModalComponent {
  @Input() type: Type;

  newTypeForm: FormGroup;
  loading: boolean;
  imagePath: string;
  updateMode: boolean = false;
  public finished: EventEmitter<boolean>;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private toast: ToastService,
    private router: Router
  ) {
    this.finished = new EventEmitter<boolean>
  }

  ngOnInit() {
    this.newTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', [Validators.required, Validation.validUrl]]
    });

    if (this.type) {
      this.updateMode = true;
      this.initUpdateForm()
    }
  }

  public get f() {
    return this.newTypeForm.controls
  }

  addType() {
    let type: Type = new Type(
      this.f['image'].value,
      this.f['name'].value,
      null
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

  private initUpdateForm() {
    this.f['name'].setValue(this.type.name);
    this.f['image'].setValue(this.type.imageUrl);
  }

  saveType() {
    let type: Type = new Type(
      this.f['image'].value,
      this.f['name'].value,
      null
    )

    if (!this.updateMode) {
      this.productService.addProductType(type)
        .subscribe({
          next: value => {
            if (value.code === 'ACCEPTED') {
              this.toast.show("New Type Added!", {classname: 'bg-success text-light', delay: 2000})
              this.modal.dismiss();
              this.finished.emit(true)
            } else {
              this.toast.show(value.message, {classname: 'bg-danger text-light', delay: 2000})
            }
          }
        })
    }
    else {
      type.id = this.type.id
      this.productService.updateProductType(type)
        .subscribe({
          next: value => {
            if (value.code === 'ACCEPTED') {
              this.toast.show("Type Updated!", {classname: 'bg-success text-light', delay: 2000})
              this.modal.dismiss();
              this.finished.emit(true)
            } else {
              this.toast.show(value.message, {classname: 'bg-danger text-light', delay: 2000})
            }
          }
        })
    }
  }
}
