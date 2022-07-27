import { Component, OnInit } from '@angular/core';
import { Producto } from '../../admin/productos/shared/producto.model';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [],
})
export class IndexComponent implements OnInit {
  ultimosProductos?: Producto[];
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getUltimosProductos().subscribe((Response) => {
      this.ultimosProductos = Response;
    });
  }
}
