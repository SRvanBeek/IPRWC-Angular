import { Component } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../shared/_services/product.service";
import {Product} from "../../shared/_models/product.model";
import {ExtraImage} from "../../shared/_models/extraImage.model";
import {ToastService} from "../../shared/_services/toast.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  product: Product;
  id: number;
  images: string[] = [];
  selectedImage: string;

  constructor(private route: ActivatedRoute, private productService: ProductService, public toastService: ToastService) {
  }

  ngOnInit(): void {
    this.images = []
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.productService.getOne(this.id).subscribe(
            {next: value => {
                this.product = value.payload
                this.images.push(this.product.imageUrl)
                this.selectedImage = this.product.imageUrl;
                this.loadExtraImages(this.product.id);
              }
            }
          )
        }
      )
  }

  loadExtraImages(productId: number) {
    this.productService.getExtraImages(productId)
      .subscribe(
        {next: value => {
            const extraImages: ExtraImage[] = value.payload;
            extraImages.forEach(extraImages => {
              this.images.push(extraImages.image_url)
            })
          }
        }
      )
  }

  onImageSelected(image: string) {
    this.selectedImage = image
  }

  addToCart() {
    let cart: string[] = [];

    if (localStorage.getItem(("cart"))) {
      cart = JSON.parse(localStorage.getItem(("cart")));
    }

    cart.push(String(this.product.id))
    localStorage.setItem("cart", JSON.stringify(cart))
    this.showSuccess()
  }

  showSuccess() {
    this.toastService.show(this.product.name + 'added to cart!', { classname: 'bg-success text-light', delay: 5000 });
  }


  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
