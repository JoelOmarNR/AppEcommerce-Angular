import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../shared/carrito.service';
import { Producto } from '../../admin/productos/shared/producto.model';
import { HomeService } from '../shared/home.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
})
export class CarritoComponent implements OnInit {
  loading: boolean = false;
  constructor(
    private carritoService: CarritoService,
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      this.loading = true;

      this.homeService.comprobarPagoPaypal(token).subscribe((response: any) => {
        if (response.success) {
          this.carritoService.removerItems();
          this.router.navigate(['detalles-venta', response.idVenta]);
        }
      });
    }
  }

  get items() {
    return this.carritoService.items;
  }

  get total() {
    return this.carritoService.items
      .map((item) => item.precio)
      .reduce((i1, i2) => i1 + i2, 0);
  }

  removerItem(item: Producto) {
    this.carritoService.removerItem(item);
  }

  pagar() {
    const idProductos = this.items.map((item) => item.id);

    this.loading = true;

    this.homeService.crearPagoPaypal(idProductos).subscribe((response: any) => {
      window.location = response.url;
    });
  }
}
