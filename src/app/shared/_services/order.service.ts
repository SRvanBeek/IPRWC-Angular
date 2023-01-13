import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {DecimalPipe, formatNumber} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private numberPipe: DecimalPipe) {
  }

  public getAll(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/orders")
  }

  public placeOrder(customerId: number, costValue: number, productIdsString: number[]): Observable<any> {
    let productIds: number[] = []
    for (let i = 0; i < productIdsString.length; i++) {
      productIds.push(productIdsString.at(i))
    }
    let cost: string = this.numberPipe.transform(costValue,'0.2-2')
    cost = cost.replace(',', "")
    console.log(cost)
    return this.http.post<any>(environment.apiUrl + "/api/orders", {customerId, cost, productIds})
  }
}
