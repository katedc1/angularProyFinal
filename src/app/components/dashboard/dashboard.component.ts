import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import {MatTableModule} from '@angular/material/table';
import { ApiService } from '../../services/api.service';

export interface Estudiante {
  nombre: string;
  apellido: string;
  edad: number;
  carrera: string
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  nombres_columnas: string[] = ['nombre', 'apellido', 'edad', 'carrera'];

  //GET A ESTUDIANTES
  lista_estudiantes:any;

  constructor(private _apiService: ApiService){}

  ngOnInit(): void {
    this.mostrarEstudiantes();
  }

  mostrarEstudiantes(){
    this._apiService.getData().subscribe(datos => {
      this.lista_estudiantes = datos;
      console.log('data',this.lista_estudiantes)
    });
  }

}
