import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './productos/lista-productos/lista-productos.component';
import { FormProductoComponent } from './productos/form-producto/form-producto.component';
import { LayoutComponent } from '../admin/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'productos',
        component: ListaProductosComponent,
      },

      {
        path: 'productos/nuevo',
        component: FormProductoComponent,
      },

      {
        path: 'productos/:id',
        component: FormProductoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
