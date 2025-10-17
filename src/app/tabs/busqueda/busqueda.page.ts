import { Component, OnInit, inject} from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { RecetasService } from 'src/app/services/recetas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
  standalone: false,
})
export class BusquedaPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  ingredientToAdd: string = '';
  recipes: any[] = [];
  selectedRecipe: any = null;
  currentTime: string | undefined;
  items: string[];

  constructor(private recetasService: RecetasService) {this.items = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4', 'Elemento 5'];}

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString(); // aca obtenemos la hora
  }

  addIngredient() {
    if (!this.ingredientToAdd) {
      return;
    }
    this.recetasService.getRecipesByIngredients(this.ingredientToAdd, 5).subscribe(data => {
      this.recipes = data;
      this.selectedRecipe = null; // Reinicializa la receta seleccionada
    });
    this.ingredientToAdd = ''; // Limpiar el campo de entrada
  }

  getRecipeInfo(id: number) {
    this.recetasService.getRecipeInformation(id).subscribe(data => {
      this.selectedRecipe = data;
    });
  }

  limpiarResultados() {
    this.recipes = []; // Limpia la lista de recetas
    this.selectedRecipe = null; // Limpia la receta seleccionada
    this.ingredientToAdd = ''; // Limpia el campo de entrada
  }

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  // signOut(){
  //   this.firebaseSvc.signOut();
  // }


}
