import {Routes} from '@angular/router';
import {ProductoComponent} from './producto/producto.component'
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './cliente/home/home.component';
import {DetallesComponent} from './producto/detalles/detalles.component';

export const routes: Routes = [
  // Ruta inicial
  {
    path: '',
    component: HomeComponent
  },
  // Auth
  {
    path: 'login',
    component: LoginComponent
  },
  // Producto
  {
    path: 'producto',
    children: [
      {
        path: '',
        component: ProductoComponent
      },
      {
        path: ':id',
        component: DetallesComponent
      }
    ]
  },
  {
    path: 'agendarCita',
    loadComponent: () => import('./paginas/clientes/agendar-cita/agendar-cita.component')
  }
];
