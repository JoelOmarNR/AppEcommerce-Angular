import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../shared/producto.model';
import { ProductoService } from '../shared/producto.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styles: [],
})
export class FormProductoComponent implements OnInit {
  formulario?: UntypedFormGroup;
  errors: any;
  producto?: Producto;

  constructor(
    private productoService: ProductoService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '');

    console.log('id', id);

    if (id) {
      this.productoService.get(id).subscribe((response) => {
        this.producto = response;

        this.formulario = this.fb.group({
          nombre: [
            response.nombre,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100),
            ],
          ], // obligatorio y entre 3 - 100 caracteres
          slug: [
            response.slug,
            [Validators.required, Validators.pattern('[a-z0-9-]+')],
          ], // obligatorio y debe cumplir la expresión regular [a-z0-9-]+
          descripcion: [response.descripcion, [Validators.required]], // obligatorio
          marca: [response.descripcion, [Validators.required]], // obligatorio
          stock: [response.stock, [Validators.required, Validators.min(0)]],
          precio: [response.precio, [Validators.required, Validators.min(0)]], // obligatorio y su valor debe ser 0 como mínimo
          rutaArchivo: [response.rutaArchivo, [Validators.required]], // obligatorio y su valor debe ser 0 como mínimo
          rutaPortada: [response.rutaPortada, [Validators.required]], // obligatorio y su valor debe ser 0 como mínimo
        });
      });
    } else {
      this.formulario = this.fb.group({
        nombre: [
          ,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ], // obligatorio y entre 3 - 100 caracteres
        slug: [, [Validators.required, Validators.pattern('[a-z0-9-]+')]], // obligatorio y debe cumplir la expresión regular [a-z0-9-]+
        marca: [, [Validators.required]], // obligatorio
        descripcion: [, [Validators.required]], // obligatorio
        stock: [, [Validators.required, Validators.min(0)]],
        precio: [, [Validators.required, Validators.min(0)]], // obligatorio y su valor debe ser 0 como mínimo
        rutaArchivo: [, [Validators.required]], // obligatorio y su valor debe ser 0 como mínimo
        rutaPortada: [, [Validators.required]],
      });
    }
  }

  controlHasError(control: string, error: string) {
    return this.formulario?.controls[control].hasError(error);
  }

  save() {
    if (this.formulario?.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    // obtener los valores de cada control del formulario
    const values = this.formulario?.value;

    // asignar valores de simulación a rutaArchivo y rutaPortada
    /* values['rutaArchivo'] = 'abc.pdf';
    values['rutaPortada'] = 'abc.png';*/

    let request;

    if (this.producto) {
      request = this.productoService.update(this.producto.id, values);
    } else {
      request = this.productoService.create(values);
    }

    request.subscribe({
      next: (response) => {
        this.router.navigate(['/admin/productos']);
      },
      error: (err) => {
        this.errors = err.error.errors;
      },
    });
  }

  uploadFile(event: any, fieldName: string) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.productoService.uploadFile(formData).subscribe((response: any) => {
        console.log('uploaded file', response);

        this.formulario?.controls[fieldName].setValue(response.filename);
      });
    }
  }

  buildSlug() {
    'El título del curso';
    const slug = this.formulario?.controls['nombre'].value
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, ''); // Trim - from start of text
    this.formulario?.controls['slug'].setValue(slug);
  }
}
