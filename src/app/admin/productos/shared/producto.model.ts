export interface ProductoPage {
  content: Producto[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Producto {
  id: number;
  nombre: string;
  slug: string;
  marca: string;
  descripcion: string;
  rutaPortada: null;
  rutaArchivo: null;
  stock: number;
  precio: number;
  fechaCreacion: Date;
  fechaActualizacion: null;
}

export interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
