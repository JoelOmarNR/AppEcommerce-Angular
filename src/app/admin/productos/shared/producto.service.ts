import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoPage, Producto } from './producto.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiBase: string = environment.apiBase;

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 5): Observable<ProductoPage> {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'nombre');

    return this.http.get<ProductoPage>(`${this.apiBase}/admin/productos/`, {
      params,
    });
  }

  get(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiBase}/admin/productos/${id}`);
  }

  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(
      `${this.apiBase}/admin/productos/`,
      producto
    );
  }

  update(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(
      `${this.apiBase}/admin/productos/${id}`,
      producto
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiBase}/admin/productos/${id}`);
  }

  uploadFile(formData: FormData) {
    return this.http.post(`${this.apiBase}/assets/upload`, formData);
  }
}
