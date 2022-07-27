import { Component, OnInit } from '@angular/core';
import { Producto } from '../../admin/productos/shared/producto.model';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [],
})
export class ProductosComponent implements OnInit {
  productos?: Producto[];
  page: number = 0;
  last: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getProductos().subscribe((response) => {
      this.productos = response.content;
      this.page = response.number;
      this.last = response.last;
    });
  }

  cargarMasProductos() {
    if (this.last) return;
    this.page += 1;

    this.homeService.getProductos(this.page).subscribe((response) => {
      this.productos?.push(...response.content);
      this.page = response.number;
      this.last = response.last;
    });
  }
}
