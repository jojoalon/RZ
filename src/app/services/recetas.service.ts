import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  private apiKey = 'aff7fdd4b80c4563a585af707c224d6e';
  // Propiedad pública que almacena las recetas favoritas
  public recetas: any[] = [];

  constructor(private http: HttpClient) {
    // 1. CARGA INICIAL: Llama al método de carga inmediatamente al crear el servicio
    this.cargarStorage();
  }

  // ----------------------------------------------------------------------
  // MÉTODOS DE API EXTERNA
  // ----------------------------------------------------------------------

  getRecipesByIngredients(
    ingredients: string,
    number: number
  ): Observable<any> {
    return this.http.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number}&apiKey=${this.apiKey}`
    );
  }

  getRecipeInformation(id: number): Observable<any> {
    return this.http.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`
    );
  }

  // ----------------------------------------------------------------------
  // MÉTODOS DE GESTIÓN DE LOCALSTORAGE
  // ----------------------------------------------------------------------

  /**
   * Guarda el array 'this.recetas' actual en el localStorage.
   * La clave usada es 'recetas'.
   */
  guardarStorage() {
    let stringRecetas: string = JSON.stringify(this.recetas); // Convierte el array a JSON
    localStorage.setItem('recetas', stringRecetas); // Guarda en el Storage
    console.log('Recetas guardadas en localStorage.');
  }

  /**
   * Carga el array de recetas desde el localStorage al iniciar el servicio.
   */
  cargarStorage() {
    const recetasStorage = localStorage.getItem('recetas'); // Intenta recuperar la clave 'recetas'

    if(recetasStorage === null) {
      // Si el Storage está vacío, inicializa a array vacío
      this.recetas = [];
      return;
    } else {
      let objLista = JSON.parse(recetasStorage); // Convierte el JSON a objeto/array
      this.recetas = objLista; // Asigna al array público
      console.log('Recetas cargadas desde localStorage.');
      return;
    }
  }

  // ----------------------------------------------------------------------
  // MÉTODOS DE LÓGICA DE FAVORITOS
  // ----------------------------------------------------------------------

  /**
   * Agrega una receta a la lista de favoritos y guarda la lista actualizada.
   * @param receta La receta a agregar.
   */
  agregarRecetaAFavoritos(receta: any) {
    // Evita duplicados: Verifica si la receta ya existe por ID
    const existe = this.recetas.find(r => r.id === receta.id);

    if (!existe) {
        this.recetas.push(receta);
        this.guardarStorage(); // Llama a guardar para persistir el cambio
        console.log(`Receta ID ${receta.id} agregada.`);
    } else {
        console.log(`Receta ID ${receta.id} ya existe en favoritos.`);
        // Opcional: Podrías mostrar un toast indicando que ya existe
    }
  }

  /**
   * Elimina una receta de la lista de favoritos y guarda la lista actualizada.
   * @param id El ID de la receta a eliminar.
   */
  eliminarRecetaDeFavoritos(id: number) {
      // Filtra el array, manteniendo solo las recetas cuyo ID NO coincide con el ID a eliminar
      this.recetas = this.recetas.filter(r => r.id !== id);
      this.guardarStorage(); // Llama a guardar para persistir el cambio
      console.log(`Receta ID ${id} eliminada.`);
  }
}

