import {Product} from "../_models/product.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {EventEmitter, Injectable} from "@angular/core";

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

  public getRandom(amount: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/products/random/" + amount)
  }

  public getOne(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/products/" + id)
  }

  public getExtraImages(productId: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/products/images/" + productId)
  }
}
