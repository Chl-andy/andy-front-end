import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orden } from '../interface/OrdenCompra/Orden';
import { DetalleVentaDTO } from '../interface/OrdenCompra/DetalleVentaDto';
import { DetalleDto } from '../interface/ServicioCita/DetalleDto';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {

  private apiUrl = 'http://localhost:8080/ordencompra';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({ 'Authorization': "Bearer "+ token });
  }

  //Todas las órdenes para el administrador
  listarTodasOrdenes(token: string): Observable<Orden[]> {
    const headers = this.getAuthHeaders(token);
    return this.http.get<Orden[]>(this.apiUrl+'/ordenCompra/ordenes', { headers });
  }
  
  //Órdenes de un cliente específico
  listarOrdenesPorUsuario(token: string, idUsuario: number): Observable<Orden[]> {
    const headers = this.getAuthHeaders(token);
    
    return this.http.get<Orden[]>(this.apiUrl+'/ordenCompra/ordenesClientes', { headers, params: { idUsuario }});
  }

  //Detalle de una orden
  listarDetalleOrden(token: string, idOrden: number): Observable<any> { 
    const headers = this.getAuthHeaders(token);
    return this.http.get<any>(this.apiUrl+'/ordenCompra/detalleOrden/'+idOrden, { headers });
  }

  //Detalle de Ventas para veterinarios
  listarVentasVeterinarios(token: string, idUsuario: number): Observable<DetalleVentaDTO[]> {
    const headers = this.getAuthHeaders(token);
    return this.http.get<DetalleVentaDTO[]>(this.apiUrl+'/ordenCompra/listaVentas', { headers, params: { idUsuario } });
  }

  procesarOrdenCarrito(token: string, idUsuario: number): Observable<string> {
    const headers = this.getAuthHeaders(token);
    return this.http.post(this.apiUrl+'/ordenCompra/procesarCarrito', null, { headers, params:{idUsuario}, responseType: 'text' });
  }
  
  procesarOrdenCita(token: string, idUsuario: number, idServicio: number, idMascota: number, fechaCita: string): Observable<string> {
    const headers = this.getAuthHeaders(token);
    return this.http.post(this.apiUrl+'/ordenCompra/procesarCita', null, { headers, params:{idUsuario,idServicio,idMascota,fechaCita}, responseType: 'text'});
  }

}
