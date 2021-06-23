import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productos } from '../../models/productos';
import { ModalDialogService } from '../../services/modal-dialog.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  Lista: Productos[] = [];
  FormReg: FormGroup;
  mostrar: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private empresasService: ProductosService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.mostrarTabla();
    this.createForm();
  }

  mostrarTabla() {
    this.empresasService.get().subscribe((res: any) => {
      this.Lista = res;
    });
  }
  Agregar() {
    this.mostrar = true;
  }

  createForm() {
    this.FormReg = this.formBuilder.group({
      ProductoID: [0],
      ProductoNombre: ['', [Validators.required]],
      ProductoFechaAlta: [null, [Validators.required]],
      ProductoStock: [0, [Validators.required]]
    });
  }
  Grabar() {
    if (this.FormReg.invalid) {
      return;
    }
    const formValue = this.FormReg.value;
    if (formValue.IdEmpresa == 0 || formValue.IdEmpresa == null) {
      formValue.IdEmpresa = 0;
      this.empresasService.post(formValue).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.mostrarTabla();
      });
    }
  }
  Volver() {
    this.mostrar = false;
  }
}