import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { IndexComponent } from './index/index.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { TarjetaProductoComponent } from './shared/tarjeta-producto/tarjeta-producto.component';
import { ProductosComponent } from './productos/productos.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    LayoutComponent,
    IndexComponent,
    TarjetaProductoComponent,
    ProductosComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule,
    InfiniteScrollModule,
  ],
})
export class HomeModule {}
