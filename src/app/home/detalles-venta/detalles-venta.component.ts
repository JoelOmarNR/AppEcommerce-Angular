import { Component, OnInit } from '@angular/core';
import { Venta, Item } from '../shared/venta.model';
import { HomeService } from '../shared/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-venta',
  templateUrl: './detalles-venta.component.html',
})
export class DetallesVentaComponent implements OnInit {
  venta?: Venta;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idVenta = parseInt(this.route.snapshot.paramMap.get('idVenta')!);

    this.homeService.getVenta(idVenta).subscribe((venta) => {
      this.venta = venta;
    });
  }

  descargarArchivo(item: Item) {
    this.homeService.descargarArchivo(item.id).subscribe((blob) => {
      const _blob = new Blob([blob], {
        type: 'application/pdf; charset=utf-8',
      });

      const a = document.createElement('a');
      const url = window.URL.createObjectURL(_blob);

      a.href = url;
      a.download = `${item.producto.nombre}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      item.numeroDescargasDisponibles -= 1;
    });
  }
}
