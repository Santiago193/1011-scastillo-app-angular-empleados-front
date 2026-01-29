import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Empleado } from "./components/empleado/empleado";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Empleado],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('prueba');
}
