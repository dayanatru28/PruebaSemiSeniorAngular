import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { taskDTO } from '../models/task.dto';

@Injectable({
  providedIn: 'root'
})
export class AdminTaskService {

  //Direccion donde se encuentra el servicio de informacion
  private apiUrl = 'http://localhost:3000/tareas';

  constructor(private http: HttpClient) {}

  getTareas(): Observable<taskDTO[]> {
    return this.http.get<taskDTO[]>(this.apiUrl);
  }

  agregarTarea(tarea: taskDTO): Observable<taskDTO> {
    return this.http.post<taskDTO>(this.apiUrl, tarea);
  }

  actualizarTarea(id: number, tarea: Partial<taskDTO>): Observable<taskDTO> {
    return this.http.patch<taskDTO>(`${this.apiUrl}/${id}`, tarea);
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id.toString()}`);
  }

}
