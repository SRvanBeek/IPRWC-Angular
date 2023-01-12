import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {JwtToken} from "../_models/JwtToken";
import {environment} from "../../environments/environment";
import {LoginComponent} from "../_modals/login/login.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<JwtToken | null>;
  public token: Observable<JwtToken | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal
  ) {
    this.tokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('JwtToken')!));
    this.token = this.tokenSubject.asObservable();
  }


  public get tokenValue() {
    return this.tokenSubject;
  }

  login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded',
        }
      )
    };
    let body = new URLSearchParams();

    body.set('username', username);
    body.set('password', password);

    return this.http.post<any>(environment.apiUrl + '/api/login', body, options)
      .pipe(map(token => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('JwtToken', JSON.stringify(token));
        this.tokenSubject.next(token);
        this.autoLogout(true);
        return token;
      }));
  }

  register(username: string, password: string, email: string) {
    interface RegisterBody {
      username: string;
      password: string;
      email: string;
    }

    let body: RegisterBody = {username, password, email}

    return this.http.post<any>(environment.apiUrl + '/api/users/register', body)
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('JwtToken');
    this.tokenSubject.next(null);
  }

  autoLogout(openModal: boolean): boolean {
    if (!this.decodedToken()) {
      return false;
    }
    if ((this.decodedToken().exp * 1000 - Date.now()) < 0) {
      this.logout();
      return false;
    }

    setTimeout(() => {
      this.logout()
      if (openModal) {
        this.modalService.open(LoginComponent)
      }
      }, (this.decodedToken().exp * 1000 - Date.now())
    )
    return true;
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem('JwtToken');
  }

  private decodedToken() {
    let jwt = localStorage.getItem('JwtToken');
    if (!jwt) {
      return null;
    }
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    return JSON.parse(decodedJwtJsonData);
  }

  public isAdmin(): Promise<boolean> {
      let tokenData = this.decodedToken();

      if (!tokenData) {
        return new Promise(
          (resolve, reject) => {
            resolve(false)
          })
      }

      return new Promise(
        (resolve, reject) => {
          let roles = tokenData.roles;
          resolve(roles.includes('ROLE_ADMIN'));

        }
      )
  }
}
