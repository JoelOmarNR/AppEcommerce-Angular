import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Producto, ProductoPage } from '../shared/producto.model';
import { ProductoService } from '../shared/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styles: [],
})
export class ListaProductosComponent implements OnInit {
  productoPage?: ProductoPage;
  displayedColumns: string[] = [
    'nombre',
    'marca',
    'fechaCreacion',
    'stock',
    'precio',
    'acciones',
  ];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.productoService.getAll().subscribe((response) => {
      this.productoPage = response;
    });
  }

  delete(producto: Producto) {
    const ok = window.confirm('¿Estás seguro de eliminar el producto?');

    if (ok) {
      this.productoService.delete(producto.id).subscribe(() => {
        this.getAll();
      });
    }
  }

  onPaginateChange(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;

    this.productoService.getAll(page, size).subscribe((response) => {
      this.productoPage = response;
    });
  }
}
