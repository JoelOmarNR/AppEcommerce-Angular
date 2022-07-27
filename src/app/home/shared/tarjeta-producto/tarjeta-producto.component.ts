import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarritoService } from '../carrito.service';
import { Producto } from '../../../admin/productos/shared/producto.model';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styles: [],
})
export class TarjetaProductoComponent implements OnInit {
  @Input() producto!: Producto;

  constructor(
    private carritoService: CarritoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  agregarProductoAlCarrito() {
    this.carritoService.agregarItem(this.producto);
    this.snackBar.open('El producto ha sido agregado al carrito', 'Cerrar', {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  removerProductoDelCarrito() {
    this.carritoService.removerItem(this.producto);
  }
  productoYaExisteEnCarrito() {
    return this.carritoService.itemYaExiste(this.producto);
  }
}
