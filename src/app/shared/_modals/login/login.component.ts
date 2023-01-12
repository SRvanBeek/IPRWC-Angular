import {Component, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../_services/auth.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import Validation from "../../_validation/validation";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  failedAuth = false;
  registerMode: boolean = false;
  hidden: boolean = true;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    public activeModal: NgbActiveModal
  ) {
    if (this.authService.tokenValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]],
      passwordConfirm: ['', [
        Validators.required
      ]]
    },
      {validators: [Validation.match('password', 'passwordConfirm')]});
  }

  get fLogin() {
    return this.loginForm.controls;
  }

  get fRegister() {
    return this.registerForm.controls;
  }

  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;
    this.failedAuth = false;
    this.authService.login(this.fLogin['username'].value, this.fLogin['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          this.activeModal.close()
          this.loading = false
        },
        error: error => {
          this.error = error;
          this.loading = false;
          this.failedAuth = true;
        }
      });
  }

  toggleRegister() {
    this.registerMode = !this.registerMode;
  }

  register() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.error = '';
    this.loading = true;

    this.authService.register(this.fRegister['username'].value, this.fRegister['password'].value, this.fRegister['email'].value)
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          this.activeModal.close()
          this.loading = false
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      })
  }
}

