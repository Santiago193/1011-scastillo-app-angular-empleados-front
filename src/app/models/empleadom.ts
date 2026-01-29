export interface EmpleadoM {
  _id?: string;          // MongoDB
  nombre: string;
  cargo: string;
  departamento: string;
  sueldo: number;        // number (no Number)
  createdAt?: string;
  updatedAt?: string;
}
