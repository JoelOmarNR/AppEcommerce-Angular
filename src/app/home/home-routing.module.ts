import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { IndexComponent } from './index/index.component';
import { ProductosComponent } from './productos/productos.component';
import { DetallesProductoComponent } from './shared/detalles-producto/detalles-producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetallesVentaComponent } from './detalles-venta/detalles-venta.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: 'productos',
        component: ProductosComponent,
      },
      {
        path: 'producto/:slug',
        component: DetallesProductoComponent,
      },
      {
        path: 'carrito',
        component: CarritoComponent,
      },
      {
        path: 'detalles-venta/:idVenta',
        component: DetallesVentaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
