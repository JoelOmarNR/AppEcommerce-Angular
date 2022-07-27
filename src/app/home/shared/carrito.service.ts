import { Injectable } from '@angular/core';
import { Producto } from 'src/app/admin/productos/shared/producto.model';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  CARRITO_KEY = 'mitienda_carrito';
  private _items: Producto[] = [];

  constructor() {
    const carritoString = localStorage.getItem(this.CARRITO_KEY);
    this._items = carritoString ? JSON.parse(carritoString) : [];
  }

  get items() {
    return this._items;
  }
  agregarItem(producto: Producto) {
    this._items.push(producto);
    this.guardarEnLocalStorage();
  }
  removerItem(producto: Producto) {
    this._items = this._items.filter((item) => item.id !== producto.id);
    this.guardarEnLocalStorage();
  }
  removerItems() {
    this._items = [];
    this.guardarEnLocalStorage();
  }
  itemYaExiste(producto: Producto) {
    return this._items.findIndex((item) => item.id === producto.id) >= 0;
  }

  guardarEnLocalStorage() {
    localStorage.setItem(this.CARRITO_KEY, JSON.stringify(this._items));
  }
}
