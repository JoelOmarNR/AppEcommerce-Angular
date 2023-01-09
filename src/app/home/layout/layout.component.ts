import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../shared/carrito.service';
import { AuthService } from '../../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [],
})
export class LayoutComponent implements OnInit {
  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get items() {
    return this.carritoService.items;
  }

  get name() {
    return this.authService.name;
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
