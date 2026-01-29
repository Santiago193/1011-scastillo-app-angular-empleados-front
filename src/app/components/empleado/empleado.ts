import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Empleado1 as EmpleadoService } from '../../services/empleado1';
import { EmpleadoM } from '../../models/empleadom';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-empleado',
  imports: [CommonModule, FormsModule],
  templateUrl: './empleado.html',
  styleUrl: './empleado.css',
})
export class Empleado implements OnInit{

  empleados: EmpleadoM[] = [];

  empleado: EmpleadoM = {
    nombre: '',
    cargo: '',
    departamento: '',
    sueldo: 0
  };

  editando = false;
  empleadoId: string | null = null;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  // ================== GET ==================
  obtenerEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (res) => this.empleados = res,
      error: (err) => console.error('Error al obtener empleados', err)
    });
  }

  // ================== POST ==================
  crearEmpleado(form: NgForm): void {
    this.empleadoService.addEmpleado(this.empleado).subscribe({
      next: () => {
        this.obtenerEmpleados();
        this.resetForm(form);
      },
      error: (err) => console.error('Error al crear empleado', err)
    });
  }

  // ================== EDITAR ==================
  editarEmpleado(empleado: EmpleadoM): void {
    this.empleado = { ...empleado };
    this.empleadoId = empleado._id ?? null;
    this.editando = true;
  }

  // ================== PUT ==================
  actualizarEmpleado(form: NgForm): void {
    if (!this.empleadoId) return;

    this.empleadoService.updateEmpleado(this.empleadoId, this.empleado).subscribe({
      next: () => {
        this.obtenerEmpleados();
        this.resetForm(form);
      },
      error: (err) => console.error('Error al actualizar empleado', err)
    });
  }

  // ================== DELETE ==================
  eliminarEmpleado(id?: string): void {
    if (!id) return;

    this.empleadoService.deleteEmpleado(id).subscribe({
      next: () => this.obtenerEmpleados(),
      error: (err) => console.error('Error al eliminar empleado', err)
    });
  }

  // ================== VER ==================
  verEmpleado(e: EmpleadoM): void {
    alert(
      `Empleado\n\nNombre: ${e.nombre}
Cargo: ${e.cargo}
Departamento: ${e.departamento}
Sueldo: ${e.sueldo}`
    );
  }

  // ================== RESET ==================
  private resetForm(form: NgForm): void {
    form.resetForm();
    this.empleado = {
      nombre: '',
      cargo: '',
      departamento: '',
      sueldo: 0
    };
    this.editando = false;
    this.empleadoId = null;
  }
}
