import { Producto } from 'src/app/admin/productos/shared/producto.model';

export interface Venta {
  id: number;
  fecha: Date;
  total: number;
  estado: string;
  usuario: null;
  items: Item[];
}

export interface Item {
  id: number;
  precio: number;
  numeroDescargasDisponibles: number;
  producto: Producto;
}
