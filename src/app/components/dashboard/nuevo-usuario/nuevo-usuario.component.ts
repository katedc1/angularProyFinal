import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [NavbarComponent, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent {
  validado:boolean = false;
  seeMessage:boolean = false;
  formEstudiante!:FormGroup;
  //UN POST
  constructor(private _apiService: ApiService, private router: Router){}

  ngOnInit(): void {
    this.formEstudiante = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
    lastName: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]+')]),
    age: new FormControl(0, Validators.required),
    career: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]+')])
    })
  }
  

  procesarGuardado(){
    console.log('entro guardar')
    if(this.formEstudiante.value.age! < 18){
      this.validado = false;
      //alert("Edad Incorrecta")
      Swal.fire({
        title: "¡Error!",
        text: "¡Edad Incorrecta!",
        icon: "success"
      });
    }else{
      this.validado = true;
      this.guardarDatos();
    }
  }

  guardarDatos(){
    this._apiService.postEstudiante(this.formEstudiante.value).subscribe(datos => {
      Swal.fire({
        title: "¡Exito!",
        text: "Se registro correctamente!",
        icon: "success"
      });
      this.router.navigateByUrl('/dashboard');
    });
  }
}
