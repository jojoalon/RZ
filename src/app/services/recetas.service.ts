import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {
  private apiKey = 'aff7fdd4b80c4563a585af707c224d6e';
  public recetas: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarStorage();
  }

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

  guardarStorage() {
    let stringRecetas: string = JSON.stringify(this.recetas); // Convierte el array a JSON
    localStorage.setItem('recetas', stringRecetas); // Guarda en el Storage
    console.log('Recetas guardadas en localStorage.');
  }


  cargarStorage() {
    const recetasStorage = localStorage.getItem('recetas');

    if(recetasStorage === null) {
      this.recetas = [];
      return;
    } else {
      let objLista = JSON.parse(recetasStorage);
      this.recetas = objLista;
      console.log('Recetas cargadas desde localStorage.');
      return;
    }
  }

  descargarPDF(receta: any) {
    // Lógica para descargar la receta en formato PDF
    console.log(`Descargando PDF para la receta: ${receta.title}`);
  }

    // @param receta

  agregarRecetaAFavoritos(receta: any) {
    const existe = this.recetas.find(r => r.id === receta.id);

    if (!existe) {
        this.recetas.push(receta);
        this.guardarStorage();
        console.log(`Receta ID ${receta.id} agregada.`);
    } else {
        console.log(`Receta ID ${receta.id} ya existe en favoritos.`);
    }
  }


  eliminarRecetaDeFavoritos(id: number) {
      this.recetas = this.recetas.filter(r => r.id !== id);
      this.guardarStorage();
      console.log(`Receta ID ${id} eliminada.`);
  }
}

