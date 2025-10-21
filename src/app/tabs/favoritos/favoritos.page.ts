import { Component, OnInit, inject } from '@angular/core';
import { RecetasService } from 'src/app/services/recetas.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // 👈 1. Importar el Router

@Component({
  selector: 'app-favoritos',
  templateUrl: 'favoritos.page.html',
  styleUrls: ['favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage implements OnInit{

  // Inyección de servicios usando inject (compatible con Angular moderno)
  toastController = inject(ToastController);
  alertController = inject(AlertController);
  router = inject(Router); // 👈 2. Inyectar el Router

  constructor(public recetasService: RecetasService) {}

  ngOnInit(): void {
    console.log ('FavoritosPage inicializado');
  }

  // Se asegura que la lista esté actualizada cada vez que se navega a la página
  ionViewWillEnter() {
      this.recetasService.cargarStorage();
  }

  // ============== LÓGICA DE DETALLE Y ELIMINACIÓN ================

  /**
   * Navega a la vista de detalle de la receta guardada, pasando el objeto completo.
   */
  verDetalleGuardado(receta: any) {
    console.log('Navegando a detalle de:', receta.title);

    // 👈 3. Activamos la navegación al componente de detalle guardado.
    this.router.navigate(['/receta-detalle-guardada'], {
        state: { recetaData: receta }
    });
  }

  /**
   * Muestra una alerta de confirmación antes de eliminar la receta.
   * @param id El ID de la receta a eliminar.
   */
  async eliminarReceta(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Seguro desea eliminar esta receta de favoritos?',
      buttons: [
        {
          text: 'No, Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Sí, Eliminar',
          handler: () => {
            // Lógica de borrado solo si el usuario confirma
            this.recetasService.eliminarRecetaDeFavoritos(id);
            this.mostrarToast('Receta eliminada de favoritos.');
          },
        },
      ],
    });

    await alert.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }
}
