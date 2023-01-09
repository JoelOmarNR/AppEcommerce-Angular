import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../admin/productos/shared/producto.model';
import { HomeService } from '../home.service';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../carrito.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
})
export class DetallesProductoComponent implements OnInit {
  producto?: Producto;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private carritoService: CarritoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;

    this.homeService.getProducto(slug).subscribe((response) => {
      this.producto = response;
    });
  }

  agregarProductoAlCarrito() {
    this.carritoService.agregarItem(this.producto!);
    this.snackBar.open('El producto ha sido agregado al carrito', 'Cerrar', {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  removerProductoDelCarrito() {
    this.carritoService.removerItem(this.producto!);
  }
  productoYaExisteEnCarrito() {
    return this.carritoService.itemYaExiste(this.producto!);
  }
}
