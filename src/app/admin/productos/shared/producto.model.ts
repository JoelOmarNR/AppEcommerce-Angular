export interface ProductoPage {
  content: Producto[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Producto {
  id: number;
  nombre: string;
  slug: string;
  marca: string;
  descripcion: string;
  rutaPortada: string;
  rutaArchivo: string;
  stock: number;
  precio: number;
  fechaCreacion: Date;
  fechaActualizacion: Date | null;
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
