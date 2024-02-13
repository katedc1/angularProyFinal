import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = `http://localhost:3000/estudiantes`

  constructor(private http: HttpClient) { }

  public getData(): Observable<any>{
    console.log('entro get')
    return this.http.get<any>(this.urlApi);
  }

  public postEstudiante(nuevo_estuduante:any): Observable<any>{
    return this.http.post<any>(this.urlApi, nuevo_estuduante);
  }
}
