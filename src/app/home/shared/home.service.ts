import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  ProductoPage,
  Producto,
} from '../../admin/productos/shared/producto.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiBase: string = environment.apiBase;
  constructor(private http: HttpClient) {}

  getUltimosProductos() {
    return this.http.get<Producto[]>(`${this.apiBase}/ultimos-productos`);
  }
  getProductos(page: number = 0, size: number = 6) {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'fechaCreacion');

    return this.http.get<ProductoPage>(`${this.apiBase}/productos/`, {
      params,
    });
  }
  getProducto(slug: string) {
    return this.http.get<Producto>(`${this.apiBase}/productos/${slug}`);
  }
}
