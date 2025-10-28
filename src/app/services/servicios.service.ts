import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioRequestDTO, ServicioResponseDTO } from '../interface/Servicio/Servicio';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
private apiUrl=environment.gatewayUrl+'/servicio/servicios'
  constructor(private httpClient:HttpClient) { }

  obtenerListaServicios(): Observable<ServicioResponseDTO[]>{
    return this.httpClient.get<ServicioResponseDTO[]>(`${this.apiUrl}`)
  }

  obtenerServicioPorId(id:number): Observable<ServicioResponseDTO>{
return this.httpClient.get<ServicioResponseDTO>(`${this.apiUrl}/${id}`)

}

  /*agregarServicio(servicio: ServicioRequestDTO): Observable<ServicioResponseDTO> {
    return this.httpClient.post<ServicioResponseDTO>(`${this.apiUrl}`, servicio)
  }

  editarServicio(id: number, servicio: ServicioRequestDTO): Observable<ServicioResponseDTO> {
    return this.httpClient.put<ServicioResponseDTO>(`${this.apiUrl}/${id}`, servicio)
  }  */

  eliminarServicio(id:number): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`)
  }

  obtenerImagen(id: number): Observable<Blob> {
  return this.httpClient.get(`${this.apiUrl}/imagen/${id}`, { responseType: 'blob' });
}

// NUEVO: para crear con imagen
  agregarServicioConImagen(formData: FormData): Observable<ServicioResponseDTO> {
    return this.httpClient.post<ServicioResponseDTO>(this.apiUrl, formData);
  }

  // NUEVO: para editar con imagen
  editarServicioConImagen(id: number, formData: FormData): Observable<ServicioResponseDTO> {
    return this.httpClient.put<ServicioResponseDTO>(`${this.apiUrl}/${id}`, formData);
  }

  obtenerListaServiciosPorVeterinario(usuarioId: number): Observable<ServicioResponseDTO[]> {
    return this.httpClient.get<ServicioResponseDTO[]>(`${this.apiUrl}/usuario/${usuarioId}`)
  }

}
