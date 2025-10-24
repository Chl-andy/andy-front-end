import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearMascComponent } from '../crear-masc/crear-masc.component';

import Swal from 'sweetalert2';
import { Mascota } from '../../../../interface/Mascota/Mascota';
import { MascotaService } from '../../../../services/mascota.service';

@Component({
  selector: 'app-lista-masc',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CrearMascComponent],
  templateUrl: './lista-masc.component.html',
  styleUrl: './lista-masc.component.scss'
})
export class ListaMascComponent implements OnInit {
  mascotas: Mascota[] = []
  mascotaSeleccionado: Mascota | null = null

  constructor(private mascotaService: MascotaService) {}

  ngOnInit(): void {
    this.cargarMascota()
  }

  cargarMascota() {
    this.mascotaService.obtenerListaMascotas().subscribe({
      next: (data) => (this.mascotas = data),
      error: (err) => {
        console.error('Error al obtener mascotas:', err);
        Swal.fire('Error', 'No se pudo cargar la lista de mascotas', 'error')
      }
    })
  }

  abrirModal() {
    this.mascotaSeleccionado = null
    const modalElement = document.getElementById('nuevaMascotaModal')
    if(modalElement) {
      modalElement.classList.add('show')
      modalElement.style.display = 'block'
      modalElement.setAttribute('aria-hidden', 'false')
      document.body.classList.add('modal-open')
      const backdrop = document.createElement('div')
      backdrop.className = 'modal-backdrop fade show'
      document.body.appendChild(backdrop)
    }
  }

  cerrarModal() {
    const modalElement = document.getElementById('nuevaMascotaModal')
    if (modalElement) {
      modalElement.classList.remove('show')
      modalElement.style.display = 'none'
      modalElement.setAttribute('aria-hidden', 'true')
      document.body.classList.remove('modal-open')

      const backdrop = document.querySelector('.modal-backdrop')
      if (backdrop) {
        backdrop.remove()
      }
    }
  }

  editarMascota(mascota: Mascota) {
    this.mascotaSeleccionado = {...mascota}
    this.abrirModal()
  }

  eliminarMascota(idMascota: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la mascota de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if(result.isConfirmed) {
        this.mascotaService.eliminarMascota(idMascota).subscribe(() => {
          Swal.fire('¡Eliminado!', 'La mascota ha sido eliminada.', 'success')
          this.cargarMascota()
        })
      }
    })
  }


}
