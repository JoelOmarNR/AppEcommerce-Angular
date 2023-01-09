import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../shared/auth.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  credentials: Credentials = {
    username: '',
    password: '',
  };
  error: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(formulario: NgForm) {
    if (formulario.form.invalid) {
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.error = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = true;
      },
    });
  }
}
