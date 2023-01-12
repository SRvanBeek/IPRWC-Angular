import {Product} from "../_models/product.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {EventEmitter, Injectable} from "@angular/core";
import {Type} from "../_models/type.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productSelected = new EventEmitter<Product>;

  constructor(private http: HttpClient ) {

  }

  public getAll(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/products")
  }

  public getAllByType(type: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/products/bytype/" + type)
  }

  public getRandom(amount: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/products/random/" + amount)
  }

  public getOne(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/products/" + id)
  }

  public getExtraImages(productId: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/productImages/" + productId)
  }

  public getProductTypes(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/productTypes/")
  }

  public addProductType(type: Type): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "/api/productTypes", type)
  }

  public addProduct(product: Product): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "/api/products", product)
  }
}
