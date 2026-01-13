import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LogIn } from '../../../models/login';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-c-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './c-login.html',
  styleUrl: './c-login.scss',
})
export class CLogin {
  loginForm!: FormGroup;
  login: LogIn = { login: '', password: '' };
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmitLogin() {
    this.loginService.logIn(this.login).subscribe({
      next: () => {
        this.error = '';
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        this.error = error.error?.message;
      },
    });
  }
}
