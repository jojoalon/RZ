import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { RecetasService } from 'src/app/services/recetas.service';
import { ToastController } from '@ionic/angular'; // 👈 1. Importar ToastController

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
  standalone: false,
})
export class BusquedaPage implements OnInit {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  // 👈 2. Inyectar ToastController
  toastController = inject(ToastController);

  ingredientToAdd: string = '';
  recipes: any[] = [];
  selectedRecipe: any = null;
  currentTime: string | undefined;
  items: string[];
  searchExecuted: boolean = false;

  constructor(private recetasService: RecetasService) {
    this.items = [
      'Elemento 1',
      'Elemento 2',
      'Elemento 3',
      'Elemento 4',
      'Elemento 5',
    ];
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); // aca obtenemos la hora
  }

  addIngredient() {
    if (!this.ingredientToAdd) {
      return;
    }
    this.recipes = [];
    this.selectedRecipe = null;

    this.recetasService
      .getRecipesByIngredients(this.ingredientToAdd, 5)
      .subscribe({
        next: (data) => {
          this.recipes = data;
          this.selectedRecipe = null; // Reinicializa la receta seleccionada
        },
        error: (err) => {
          console.error('Error al buscar recetas:', err);
        },
        complete: () => {
          this.searchExecuted = true;
        },
      });

    this.ingredientToAdd = ''; // Limpiar el campo de entrada
  }

  getRecipeInfo(id: number) {
    this.recetasService.getRecipeInformation(id).subscribe((data) => {
      this.selectedRecipe = data;
    });
  }

  limpiarResultados() {
    this.recipes = [];
    this.selectedRecipe = null;
    this.ingredientToAdd = '';
    this.searchExecuted = false;
  }

  // ==========================================================
  // 3. NUEVO MÉTODO PARA GUARDAR LA RECETA EN FAVORITOS
  // ==========================================================

  /**
   * Llama al servicio para agregar la receta actualmente seleccionada
   * a la lista de favoritos y la guarda en el localStorage.
   */
  agregarAFavoritos() {
    if (this.selectedRecipe) {
      // Usamos el método implementado en RecetasService
      this.recetasService.agregarRecetaAFavoritos(this.selectedRecipe);

      // Muestra una notificación al usuario
      this.mostrarToast('¡Receta agregada a tus favoritos! ❤️');
    }
  }

  /**
   * Método auxiliar para mostrar una notificación.
   * @param mensaje El texto a mostrar.
   */
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }
}

