import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient ) {
  }

  public getAll(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/orders")
  }

  public placeOrder(customerId: number, productIdsString: number[]): Observable<any> {
    let productIds: number[] = []
    for (let i = 0; i < productIdsString.length; i++) {
      productIds.push(productIdsString.at(i))
    }
    return this.http.post<any>(environment.apiUrl + "/api/orders", {customerId, productIds})
  }
}
