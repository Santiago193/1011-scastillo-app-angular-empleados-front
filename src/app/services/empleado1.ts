import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoM } from '../models/empleadom';

@Injectable({
  providedIn: 'root',
})
export class Empleado1 {

   private apiUrl = 'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) {}

  // ================== GET ==================
  getEmpleados(): Observable<EmpleadoM[]> {
    return this.http.get<EmpleadoM[]>(this.apiUrl);
  }

  // ================== POST ==================
  addEmpleado(empleado: EmpleadoM): Observable<EmpleadoM> {
    return this.http.post<EmpleadoM>(this.apiUrl, empleado);
  }

  // ================== PUT ==================
  updateEmpleado(id: string, empleado: EmpleadoM): Observable<EmpleadoM> {
    return this.http.put<EmpleadoM>(`${this.apiUrl}/${id}`, empleado);
  }

  // ================== DELETE ==================
  deleteEmpleado(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
