import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receta-detalle-guardada',
  templateUrl: './receta-detalle-guardada.page.html',
  styleUrls: ['./receta-detalle-guardada.page.scss'],
  standalone: false,
})
export class RecetaDetalleGuardadaPage implements OnInit {

  // Propiedad para almacenar el objeto completo de la receta
  receta: any = null;

  constructor(private router: Router) {
    // 1. Verificar si se pasaron datos a través del estado de navegación
    const navigation = this.router.getCurrentNavigation();

    // El objeto de la receta se pasó bajo la clave 'recetaData'
    // 🎯 CORRECCIÓN: Usamos la notación de corchetes [] para acceder
    // a la propiedad 'state', tal como sugiere el error de TypeScript.
    const recetaData = navigation?.extras.state?.['recetaData'];

    if (recetaData) {
      // 2. Asignar el objeto de la receta completo
      this.receta = recetaData;
      console.log('Receta cargada desde navigation state:', this.receta.title);
    } else {
      // 3. Manejar el caso de acceso directo sin datos (ej. si refrescan la página)
      console.warn('Acceso sin datos de receta. Redirigiendo o mostrando mensaje.');
      // Dejamos el manejo en el HTML, pero podrías redirigir aquí si quieres.
    }
  }

  ngOnInit() {
    // Este componente no requiere lógica compleja en la inicialización
  }

  /**
   * Función que permite volver a la página de favoritos.
   * Usada en el HTML cuando hay un error de carga de datos.
   */
  volver() {
    this.router.navigateByUrl('/tabs/favoritos');
  }

}
