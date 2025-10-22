import { Component, OnInit, inject } from '@angular/core';
import { RecetasService } from 'src/app/services/recetas.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: 'favoritos.page.html',
  styleUrls: ['favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage implements OnInit{

  toastController = inject(ToastController);
  alertController = inject(AlertController);
  router = inject(Router);

  constructor(public recetasService: RecetasService) {}

  ngOnInit(): void {
    console.log ('FavoritosPage inicializado');
  }

  ionViewWillEnter() {
      this.recetasService.cargarStorage();
  }


  verDetalleGuardado(receta: any) {
    console.log('Navegando a detalle de:', receta.title);

    this.router.navigate(['/receta-detalle-guardada'], {
        state: { recetaData: receta }
    });
  }

  

  /**
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
