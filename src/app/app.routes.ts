import {Routes} from '@angular/router';
import {ProductoComponent} from './cliente/layout/producto/producto.component'
import {LoginComponent} from './auth/login/login.component';
import {DetallesComponent} from './paginas/veterinarios/productos/detalles/detalles.component';
import {AgregarComponent} from './paginas/veterinarios/productos/agregar/agregar.component';
import {ProductosComponent} from './paginas/veterinarios/productos/productos.component';
import {ActualizarComponent} from './paginas/administrador/productos/actualizar/actualizar.component';
import { ListaMascComponent } from './paginas/administrador/mascota/lista-masc/lista-masc.component';
import { ListaServicioComponent } from './paginas/administrador/servicio/lista-servicio/lista-servicio.component';
import { ListarComponent } from './paginas/administrador/productos/listar/listar.component';
import { ListaMascClientComponent } from './paginas/clientes/mascota/lista-masc-client/lista-masc-client.component';
import { ListarServicioVeterinarioComponent } from './paginas/veterinarios/servicio/listar-servicio-veterinario/listar-servicio-veterinario.component';
import { ListarServicioClienteComponent } from './paginas/clientes/servicio/listar-servicio-cliente/listar-servicio-cliente.component';
import { DetalleServicioComponent } from './paginas/clientes/servicio/detalle-servicio/detalle-servicio.component';

export const routes: Routes = [
  
  { path: '', redirectTo: '/producto', pathMatch: 'full' },

  // Auth
  { path: 'login', component: LoginComponent },

  // Registrar nuevo
  {
    path: 'registrar',
    loadComponent: () => import('./auth/registrar/registrar.component')
  },

  // Usuario - Administrador
  {
    path: 'usuarios',
    loadComponent: () => import('./paginas/administrador/usuarios/usuarios.component')
  },

  // Producto -- Producto sera la ruta inicial
  {
    path: 'producto',
    children: [
      {
        path: '',
        component: ProductoComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent
      },
      {
        path: ':id',
        component: DetallesComponent
      },
      {
        path: 'actualizar/:id',
        component: ActualizarComponent
      },
    ]
  },
  // AgendarCita
  {
    path: 'agendarCita/:idServicio',
    loadComponent: () => import('./paginas/clientes/agendar-cita/agendar-cita.component')
  },
  // OrdenCompra - Cliente
  {
    path: 'ordenCompra',
    loadComponent: () => import('./paginas/clientes/orden-compra/orden-compra.component')
  },
  // Mis Prooducto - Veterinario
  {
    path: 'misproductos',
    component: ProductosComponent,
  },
  // Ventas  - Veterinarios
  {
    path: 'misventas',
    loadComponent: () => import('./paginas/veterinarios/ventas/ventas.component')
  },
  // Ordenes de comrpa - Admin
  {
    path: 'ordenes',
    loadComponent: () => import('./paginas/administrador/ordenes/ordenes.component')
  },
  // Productos - Admin
  {
    path: 'productos',
    component: ListarComponent
  },
  // Listar mascotas - Admin
  { path: 'mascotas', component: ListaMascComponent},

  // Lista mascota - Cliente
  { path: 'mismascotas', component: ListaMascClientComponent},

   // Listar servicios - Admin
  { path: 'servicios', component: ListaServicioComponent},

  { path: 'misservicios', component: ListarServicioVeterinarioComponent},

  // listar servicios - Cliente
  { path: 'servicio', component: ListarServicioClienteComponent},
  // Detalle de un servicio
  { path: 'servicio/:id', component: DetalleServicioComponent },

  // Carrito de Compra
  {
    path: 'carrito',
    loadComponent: () => import('./paginas/clientes/carrito/carrito.component')
  }

];
